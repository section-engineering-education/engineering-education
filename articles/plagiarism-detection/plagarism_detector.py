from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd



# define document data
corpus = [
   ('doc_1', 'This is the first document.'),
    ('doc_2', 'This document is the second document.'),
   ('doc_3' ,'And this is the third one.'),
    ('doc_4', 'Is this the first document?')
]

# split doc_names and doc_data 
doc_names, doc_data = zip(*corpus)

# create the class Countvectorizer that converts a collection of text document to a matrix of token counts
vectorizer = CountVectorizer()






# return a term-document matrix with doc_data as input
# X: array, [n_samples, n_featrues]
document_term_matrix = vectorizer.fit_transform(doc_data)

tf_enable = True
if(tf_enable):
    tfidf_transformer = TfidfTransformer(smooth_idf=True,use_idf=True) 
    tfidf_transformer.fit(document_term_matrix)
    idf = tfidf_transformer.idf_

    # print idf values
    df_idf = pd.DataFrame(tfidf_transformer.idf_, index=vectorizer.get_feature_names(),columns=["idf_weights"]) 
 
    # sort ascending 
    df_idf.sort_values(by=['idf_weights'])
    print(df_idf)

    
    tf_idf_vector = tfidf_transformer.transform(document_term_matrix)

    df = pd.DataFrame(tf_idf_vector.T.todense(), index=vectorizer.get_feature_names(), columns=doc_names) 
    #df.sort_values(by=["tfidf"],ascending=False)

    print(df)

    cosine_matrix = cosine_similarity(tf_idf_vector)

    df = pd.DataFrame(data=cosine_matrix, 
                  columns= doc_names, 
                  index=doc_names)

    print(df)



# returns full list of tokenized words
tokenized_words =  vectorizer.get_feature_names()

# output pandas table document_term_matrix
df = pd.DataFrame(data=document_term_matrix.toarray(), 
                  columns= tokenized_words, 
                  index=doc_names)


print(df)


# compute cosine simularity matrix
cosine_matrix = cosine_similarity(document_term_matrix)

df = pd.DataFrame(data=cosine_matrix, 
                  columns= doc_names, 
                  index=doc_names)

print(df)

