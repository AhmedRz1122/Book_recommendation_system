import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Chroma  

load_dotenv()

# Constants
PERSIST_DIRECTORY = "database"
EMBEDDINGS = OpenAIEmbeddings(api_key=os.getenv("OPENAI_API_KEY"))

# Load or create vector store
def load_vector_db():
    if os.path.exists(PERSIST_DIRECTORY):
        return Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=EMBEDDINGS)

    raw_documents = TextLoader("data/tagged_description.txt", encoding="utf-8").load()
    # print("Raw documents loaded:", len(raw_documents))  # Should be 1 or more
    text_splitter = CharacterTextSplitter(separator="\n", chunk_size=500, chunk_overlap=50)
    documents = text_splitter.split_documents(raw_documents)
    # print("Chunks after split:", len(documents))   

    db = Chroma.from_documents(
        documents,
        EMBEDDINGS,
        persist_directory=PERSIST_DIRECTORY
    )
    db.persist()
    return db

db_books = load_vector_db()
print("Chroma DB loaded. Number of documents:", len(db_books.get()["documents"]))