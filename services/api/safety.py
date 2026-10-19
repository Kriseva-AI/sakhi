import re
import unicodedata

# Draft phrase coverage, not a claim of multilingual crisis detection reliability.
EMERGENCY_PHRASES = {
    'en-IN': ['immediate danger', 'attacking me now', 'kill me now', 'help me now', 'bleeding badly',
              'cannot breathe', "can't breathe", 'following me right now', 'suicide', 'hurt myself'],
    'hi-IN': ['अभी खतरे में', 'मुझे अभी मदद चाहिए', 'मार रहा है', 'जान का खतरा', 'abhi khatra', 'abhi madad'],
    'bn-IN': ['এখন বিপদে', 'এখনই সাহায্য', 'আমাকে মারছে'],
    'mr-IN': ['आत्ता धोका', 'आत्ता मदत', 'मला मारत आहे'],
    'te-IN': ['ఇప్పుడు ప్రమాదం', 'వెంటనే సహాయం', 'నన్ను కొడుతున్నారు'],
    'ta-IN': ['இப்போது ஆபத்து', 'உடனே உதவி', 'என்னை அடிக்கிறார்'],
    'gu-IN': ['અત્યારે જોખમ', 'તાત્કાલિક મદદ', 'મને મારે છે'],
    'kn-IN': ['ಈಗ ಅಪಾಯ', 'ತಕ್ಷಣ ಸಹಾಯ', 'ನನ್ನನ್ನು ಹೊಡೆಯುತ್ತಿದ್ದಾರೆ'],
    'ml-IN': ['ഇപ്പോൾ അപകടം', 'ഉടൻ സഹായം', 'എന്നെ അടിക്കുന്നു'],
    'or-IN': ['ଏବେ ବିପଦ', 'ତୁରନ୍ତ ସାହାଯ୍ୟ', 'ମୋତେ ମାରୁଛନ୍ତି'],
    'pa-IN': ['ਹੁਣ ਖ਼ਤਰਾ', 'ਤੁਰੰਤ ਮਦਦ', 'ਮੈਨੂੰ ਮਾਰ ਰਿਹਾ'],
    'as-IN': ['এতিয়া বিপদ', 'তৎক্ষণাৎ সহায়', 'মোক মাৰিছে'],
    'ur-IN': ['ابھی خطرہ', 'فوری مدد', 'مجھے مار رہا'],
    'ne-IN': ['अहिले खतरा', 'तुरुन्त मद्दत', 'मलाई कुट्दैछ'],
    'kok-IN': ['आतां धोको', 'रोखडीच मदत', 'म्हाका मारता'],
    'ks-Arab-IN': ['وُنہِ خطرہ', 'فوری مدد', 'میٚہ مدد']
}


def normalize(text: str) -> str:
    return unicodedata.normalize('NFKC', text).casefold().strip()


def safety_route(text: str, urgency: bool = False, under18: bool = False) -> str | None:
    value = normalize(text)
    if urgency or any(normalize(phrase) in value for phrases in EMERGENCY_PHRASES.values() for phrase in phrases):
        return 'urgent_redirect'
    if under18 or re.search(r'\b(?:i am|i.m|age|aged)\s*(?:[1-9]|1[0-7])\b|\bunder\s*18\b|नाबालिग|अल्पवयीन', value):
        return 'minor_redirect'
    return None


def unsafe_request(text: str) -> bool:
    value = normalize(text)
    return bool(re.search(r'ignore (?:all )?instructions|system prompt|send (?:my|her) story|'
                          r'confront|track (?:him|her)|hack (?:his|her)|diagnose|prove (?:he|she) is guilty', value))
