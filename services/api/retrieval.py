import re
import sqlite3
import threading

from .registry import resources
from .safety import normalize

# Reviewed public category labels plus explicitly draft multilingual lexical aliases.
ALIASES = {
    "cyber": "cyber online impersonation impersonating fake account blackmail sextortion digital stalking hacked "
    "साइबर ऑनलाइन धमकी নকল অ্যাকাউন্ট অনলাইন सायबर సైబర్ ஆன்லைன் இணைய கள்ளக்கணக்கு "
    "ઓનલાઇન ಸೈಬರ್ ഓൺലൈൻ ସାଇବର ਆਨਲਾਈਨ অনলাইন آن لائن नक्कली खाता सायबर سائبر",
    "home": "home domestic violence partner husband coercion shelter "
    "घरेलू हिंसा বাড়িতে হিংসা घरगुती హింస வீட்டில் வன்முறை ઘરેલુ ಹಿಂಸೆ ഗാർഹിക ଘରୋଇ "
    "ਘਰੇਲੂ ঘৰুৱা گھریلو घरेलु हिंसा घरांत تشدد",
    "workplace": "workplace work office campus boss harassment colleague employer college "
    "कार्यस्थल कार्यालय কর্মক্ষেত্রে কর্মস্থল कामाच्या ठिकाणी కార్యాలయం வேலை பணியிடம் "
    "કાર્યસ્થળ ಕೆಲಸದ ಕಚೇರಿ ജോലിസ്ഥല ଅଫିସ କାର୍ଯ୍ୟସ୍ଥଳ ਕੰਮ কৰ্মস্থান کام دفتر कार्यस्थल कामाचेर",
    "legal": "legal lawyer aid rights court कानून कानूनी আইনি कायदेशीर న్యాయ சட்ட કાનૂની ಕಾನೂನು "
    "നിയമ ଆଇନ ਕਾਨੂੰਨੀ আইনী قانونی कानुनी कायदो قانونی",
    "friend": "friend sister bystander दोस्त सहेली বন্ধু मैत्रीण స్నేహితురాలు தோழி நண்பர் મિત્ર "
    "ಸ್ನೇಹಿತೆ സുഹൃത്ത് ସାଙ୍ଗ ਸਹੇਲੀ বান্ধৱী دوست साथी इश्ट सहेली دۆست",
}


class Retriever:
    def __init__(self):
        self.lock = threading.Lock()
        self.db = sqlite3.connect(":memory:", check_same_thread=False)
        self.db.execute(
            "CREATE VIRTUAL TABLE pathways USING fts5(category UNINDEXED, content, "
            'tokenize="porter unicode61")'
        )
        for category, text in ALIASES.items():
            self.db.execute("INSERT INTO pathways VALUES (?, ?)", (category, text))

    def classify(self, text: str) -> str | None:
        # unicode61 splits Indic combining marks. Match intact words first and never
        # let standalone consonant fragments act as evidence for a non-Latin route.
        words = set(re.split(r"[\s,.?!؟।…:;]+", normalize(text))) - {""}
        scores = sorted(
            (
                (category, len(words & set(normalize(aliases).split())))
                for category, aliases in ALIASES.items()
            ),
            key=lambda item: item[1],
            reverse=True,
        )
        if scores[0][1] > 0 and scores[0][1] > scores[1][1]:
            return scores[0][0]
        tokens = re.findall(r"[a-z0-9]+", normalize(text))
        if not tokens:
            return None
        match = " OR ".join('"' + token + '"' for token in tokens[:100])
        with self.lock:
            rows = self.db.execute(
                "SELECT category, bm25(pathways) FROM pathways WHERE pathways MATCH ? "
                "ORDER BY bm25(pathways) LIMIT 2",
                (match,),
            ).fetchall()
        if not rows:
            return None
        if len(rows) > 1 and abs(rows[0][1] - rows[1][1]) < 1e-8:
            return None
        return rows[0][0]

    def find(self, category: str, jurisdiction: str = "India", minor: bool = False):
        all_resources = resources()
        if minor:
            all_resources = resources(fresh_only=False)
            order = ["child", "emergency"]
        else:
            order = {
                "cyber": ["cyber", "legal", "women"],
                "home": ["women", "legal", "ncw"],
                "workplace": ["workplace", "legal", "women"],
                "legal": ["legal", "women", "ncw"],
                "friend": ["women", "legal", "ncw"],
                "unsure": ["women", "legal", "ncw"],
            }[category]
        found = [
            r
            for id_ in order
            for r in all_resources
            if r.id == id_ and not (jurisdiction == "West Bengal" and id_ == "women")
        ]
        if found:
            return found
        # Expiry removes specialized recommendations, not access to an official
        # general entry point. Callers must show the retained records' expiry.
        return [r for r in resources(fresh_only=False) if r.id in ("legal", "emergency")]


retriever = Retriever()
