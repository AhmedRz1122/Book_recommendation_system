# Python Backend Setup Guide

This guide will help you set up a virtual environment, install dependencies, and run the backend using `app.py`.

---

## Prerequisites

- Python 3.10 or newer installed on your system.
- `pip` package installer (comes with Python).

---

## Setting Up the Project

### 1. Clone the Repository

```bash
git clone <git-repo-url>
cd <repo-folder>
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activating Virtual Environment

#### On Windows

```bash
venv\Scripts\activate
```

#### On MacOS or Linux

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Generate Embeddings

```bash
python test.py
```

### 6. Run Backend

```bash
python app.py
```

### Incase of Deactivating Virtual Environment

```bash
deactivate
```

---
