from datetime import datetime
from enum import Enum
from typing import List
from typing_extensions import Annotated
from pydantic import BaseModel, Field, field_validator, BeforeValidator
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]

class Emotion(str, Enum):
    I_DONT_KNOW = "I Don't Know"
    ANGER = "Anger"
    IRRITABILITY = "Irritability"
    SADNESS = "Sadness"
    DESPAIR = "Despair"
    ANXIETY = "Anxiety"
    FEAR = "Fear"
    GUILT = "Guilt"
    SHAME = "Shame"
    LONELINESS = "Loneliness"
    ISOLATION = "Isolation"
    OVERWHELM = "Overwhelm"
    STRESS = "Stress"
    CONFUSION = "Confusion"
    UNCERTAINTY = "Uncertainty"
    FRUSTRATION = "Frustration"
    HELPLESSNESS = "Helplessness"
    INSECURE = "Insecure"
    LOW_SELF_ESTEEM = "Low Self-Esteem"
    GRIEF = "Grief"
    LOSS = "Loss"
    RELAX_AND_CALM = "Relax & Calm"

class create_thought(BaseModel):
    content: str
    emotions: List[Emotion]

    @field_validator("content")
    @classmethod
    def content_must_not_be_empty(cls, v):
        if v == "":
            raise ValueError("Content must not be empty")
        return v
    
    @field_validator("emotions")
    @classmethod
    def emotions_must_not_be_empty(cls, v):
        if not v:
            raise ValueError("Emotions must not be empty")
        return v

class thought(create_thought):
    id: PyObjectId = Field(alias="_id")
    created_at: datetime
    likes: int = 0