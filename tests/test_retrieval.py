import pytest

from services.api.retrieval import Retriever


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        ("कार्यस्थल पर परेशानी", "workplace"),
        ("హింస సమస్య", "home"),
        ("सायबर प्रस्न", "cyber"),
        ("घरांत प्रस्न", "home"),
        ("कामाचेर प्रस्न", "workplace"),
        ("Someone is blackmailing me digitally", "cyber"),
    ],
)
def test_intact_indic_words_do_not_match_unrelated_fts_fragments(text, expected):
    assert Retriever().classify(text) == expected


def test_unknown_indic_text_abstains_instead_of_matching_single_consonants():
    assert Retriever().classify("अंतरिक्ष आलू परिक्रमा") is None
