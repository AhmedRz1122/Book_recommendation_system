# Book Model 

It consist of model training on the book dataset. Following models are used:

1- facebook / bart-large-mnli
https://huggingface.co/facebook/bart-large-mnli

2- j-hartmann / emotion-english-distilroberta-base
https://huggingface.co/j-hartmann/emotion-english-distilroberta-base

## bart-large-mnli:

It is used for Zero-shot Text Classification for distinguishing between different categories of book which will help in retrieving user recommended books.

## emotion-english-distilroberta-base

It is used for Zero-shot Sentiment Analysis Classification which helps is identifying the tone of the user.

## Notebooks

### data-explore.ipynb: 

Cleaning and refining the data for the project (7k books). 

### Vector-search.ipynb: 

Use of OpenAI API for text embedding generation

### text-classification.ipynb: 

Use of hugging transformer (use of API) and pre-trained model Bart-large-mnli for zero-shot text classification

### Sentimental_analysis.ipynb: 

Use of Roberta model for classifying the seven types of the emotions used in the project and their scores for predictions of the appropriate books.