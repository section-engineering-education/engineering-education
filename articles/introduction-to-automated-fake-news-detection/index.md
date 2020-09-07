# Introduction to Automated Fake News Detection

![hero](/engineering-education/introduction-to-automated-fake-news-detection/hero.jpg)

Misinformation presents a huge challenge in today’s online society. As a result, there have been many attempts to identify and classify misinformation. Specifically, in social networking sites, blogs as well online newspapers.
Since this is a very broad research area, in this article we’ll look at:
· What is fake news and why you should care.
· Manual vs automated fake news detection efforts.
· Brief introduction to machine learning and deep learning techniques to fake news detection.
· Bonus: BERT.
The goal is to give you a gentle introduction to automated fake news detection. This should hopefully challenge you to join the fight.

## What is Fake News

Fake news refers to information content which is false, misleading or whose source cannot be verified. This content may be generated to intentionally damage reputation, deceive, to gain attention. The term rose to popularity during the 2016 US Presidential Elections. It was reported that fake news likely influenced the results of the elections.

Various types of fake news include:
· Clickbait. Often eye-catching content to capture readers at the expense of being factual.
· Satire/parody. This type of content is considered to be fun and humorous thus considered to be entertaining. Yet, some readers may interpret the content as fact.
· Propaganda. This is content meant to mislead and influence the reader.
· Biased/partisan/hyper-partisan. Oftentimes this is biased political content claiming to be impartial.
· Unreliable news. Journalists may publish news whose sources are unverified. Or without carrying out any form of fact checking.

### How Fake News Works

Social media platforms are incredibly influential. The estimation of daily number of tweets is about 500 million. These platforms are ubiquitous. They are the go-to environment to share thoughts, feelings, opinions and intentions. This provides ideal conditions to distribute news with minimal guidelines and restrictions.

In today's world, it is normal to receive news from online sources through social media. News is often subjective to readers. We often choose to ingest content that appeals to the different emotions we have. So, considering this, the information that gets the most reach may not be real or accurate news. Additionally, real news may be twisted in transmission. A reader may end up with different version of the same news. This may lead to an information overload.

### Why you should care

![misinformation](/engineering-education/introduction-to-automated-fake-news-detection/misinformation.jpg)

At a time when the globe is defined by a pandemic, public health depends on reliable information. Yet we stare down the barrel of an infodemic. An infodemic is a combination of the word information and epidemic. It is an excessive amount of information about a problem that makes the solution more difficult. It also defines a wide and rapid spread of misinformation. This means that our individual health is a collective responsibility. It is tied to the behaviour of other people since news influences behaviour of the audience.
The World Health Organization has highlighted the dangers of a COVID-19 driven infodemic. It presents as much danger as the virus itself. According to WHO, fake news spreads faster and more easily than the virus.
Examples of challenges of such an infodemic include:
· Promoting and selling of fake coronavirus cures.
· Spreading myths and rumours about the nature and spread of the virus.
· Conspiracy theories about the origin and intention of the virus.
· Encouraging unfounded remedies. They range from harmless, to comical and to an extremity of being hazardous.

### What’s being done to combat fake news

Companies like Facebook, Twitter, TikTok, Google, Pinterest, Tencent, YouTube and others are working with WHO to mitigate the spread of rumours. Their efforts are geared at filtering out content that is a danger to public health. There are ways to contribute to this fight. But first, we need to understand the types of fake news detection. We look at it from the perspective of being either manual or automatic.

## Manual Fake News Detection

Manual fake news detection often involves all techniques and procedures a person can use to verify news. It could involve visiting fact checking sites. It could be crowdsourcing real news to compare with unverified news. But, the amount of data generated online daily is overwhelming. Also noting how fast information spreads online, manual fact checking becomes ineffective. Manual fact checking struggles to scale with the volume of data generated. Hence validating the purpose of automated fake news detection.

## Automated Fake News Detection

Automated detection systems provide value in terms of automation and scalability. There are various techniques and approaches implemented in fake news detection research. And it is worth noting that these approaches often overlap depending on perspective. From my personal perspective, I choose to discuss only two approaches. These two approaches focus on the methods used, as opposed to the content being analysed. They may also both involve Natural Language Processing (NLP) in their methodology.
Natural Language Processing enables computers to understand natural/human language and respond appropriately. Hence, there are two aspects involved:
· Natural Language Understanding
· Natural Language Generation
The two approaches to fake news detection are:
· Machine Learning approach
· Deep Learning approach

### Machine Learning approach

Machine learning refers to giving computers ability to learn without explicitly being programmed.
A machine learning approach uses machine learning algorithms to detect misinformation. Examples of these algorithms include:
**Naïve Bayes:** uses probabilistic approaches based on Bayes theorem. This algorithm is often used for text classification.
**Decision tree:** a supervised learning algorithm that has a tree-like flow. It helps in decision making. A useful algorithm for both classification and regression tasks.
Random forest: simply a combination of decision trees.
**Support Vector Machine:** a supervised learning algorithm. It examines data for classification and regression analysis. It classifies data into two categories.
**Logistic regression:** contrary to the name, it is a classification algorithm used to estimate discrete values.
**K-nearest-neighbour:** a simple algorithm that is used for both classification and regression tasks. Though it is more widely used for classification problems.

Datasets are used to refine the algorithms. These datasets may be split as training data or test data.
I have come across a lot of research where a system combines various machine learning algorithms and data mining. Often carried out on social media platforms, especially Twitter data. For example, a model may combine machine learning, through Naïve Bayes, Support Vector Machine, and Natural Language Processing to detect fake news. The accuracy of the results is usually determined by the combinations of models used and the datasets involved. A combination of available toolkits with Bayesian learning may be used to develop a fake news detector. These toolkits include Textblob, Natural Language and SciPy.

But a challenge exists with some of these traditional machine learning approaches. They treat fake news detection as a binary classification task. These models alone struggle to contextualize text data. They need structured/labelled data. In fact, machine learning models struggle to solve complex queries with huge amounts of data. This is where deep learning models come in.

### Deep Leaning Approach

Deep learning algorithms function similar to machine learning algorithms. But there is a key difference. Deep learning algorithms have layers that interpret data differently. Artificial neural networks refer to a network of such algorithms.
Purely deep learning perspectives towards fake news have been explored in many works. Links to some at the end of the article.
A methodology may involve building classifiers to predict validity of news based only on news content. This may be achieved using Recurrent Neural Network (RNN) models and long-short term memories (LSTM).
RNN is a neural network containing loops that allow information to be stored within the network. Previous experiences influence upcoming events in RNNs. The storage of information can be attributed to LSTM. LSTM refer to artificial recurrent neural networks which allow information to persist within them. They are building blocks for RNN layers. LSTM units provide ability to “recall” values over a time interval. This influences the relationships between words and their occurrences.
An attempt to label fake news as early as possible, used Recurrent Neural Networks. The goal was to reduce time gap between news release and detection. The paper for this has been referenced at the end of the article.
A combination of machine learning and deep learning techniques is workable. There are many published works that combine the two. The aim is not only to detect fake news, but to also achieve the highest possible accuracy levels.

## Bonus: BERT

My favourite technique involves the use of Bidirectional Encoder Representations from Transformers (BERT).
Transformers are a fundamental block in most state-of-the-art NLP architectures. BERT is Google’s state of the art transformer-based language model. It has been revolutionizing the field of Natural Language Processing. BERT has been key to contextual language understanding. Which is a huge driving factor for its use for fake news detection tasks. The contextual language understanding sets BERT apart. It ensures BERT outperforms traditional machine learning models at this task. Furthermore, traditional machine learning models take in numbers as inputs. BERT converts words into numbers. This makes it easier to train models on textual data.

For fake news detection (and most NLP tasks) BERT is my ideal choice. Here’s why:
**Contextual language understanding:** BERT can account for contexts of words in a sentence. It is easier to determine news as either real or fake. As mentioned before, this is an upgrade to traditional machine learning approaches.
**BERT is pre-trained:** The amount of data used to train the original BERT model is insane. The base model is trained on 800 million words. And we are yet to factor in all the languages BERT is pre-trained in. This makes its use flexible on both small and large datasets.
**Convenience:** BERT is not only pretrained, in many languages, but also open source. It would only take a few minutes to download a model and start tweaking it to a task. You are only limited by your creativity.
I have come across literature where BERT was used to pre-train Korean data and create a pre-trained model to judge fake news. In another study, it was used to classify hyper-partisan news. Once more, links to the literature can be found at the end of the article.

## Conclusion

Fake news research has never been more important than it is now. Especially during a time when the world is fighting a pandemic. The approaches explored in this article only scratch the surface. There exist so many more approaches and criteria to fake news detection. Datasets also impact the accuracy of fake news detection tasks. Their quality and quantity is impactful. It is also worth noting that, as much as our focus is on automated approaches, the human element is key to this fight. A combination of human and automated approaches gives rise to a hybrid approach. I hope this article challenges you to join the fight against fake news.

## References

1. Approaches to Identify Fake News: A Systematic Literature Review <https://doi.org/10.1007/978-3-030-49264-9_2>

2. Abdullah-All-Tanvir, E. M. Mahir, S. Akhter and M. R. Huq, "Detecting Fake News using Machine Learning and Deep Learning Algorithms," 2019 7th International Conference on Smart Computing & Communications (ICSCC), Sarawak, Malaysia, Malaysia, 2019, pp. 1-5, doi: <https://doi.org/10.1109/ICSCC.2019.8843612>

3. S. Girgis, E. Amer and M. Gadallah, "Deep Learning Algorithms for Detecting Fake News in Online Text," 2018 13th International Conference on Computer Engineering and Systems (ICCES), Cairo, Egypt, 2018, pp. 93-97, doi: <https://doi.org/10.1109/ICCES.2018.8639198>

4. News Labeling as Early as Possible: Real or Fake? T2 - 2019 IEEE/ACM International Conference on Advances in Social Networks Analysis and Mining <http://dx.doi.org/10.1145/3341161.3342957>

5. Transformer Model Paper: <https://arxiv.org/abs/1706.03762>

6. Y. Ahn and C. Jeong, "Natural Language Contents Evaluation System for Detecting Fake News using Deep Learning," 2019 16th International Joint Conference on Computer Science and Software Engineering (JCSSE), Chonburi, Thailand, 2019, pp. 289-292, doi: <https://doi.org/10.1109/JCSSE.2019.8864171>

7. G. K. W. Huang and J. C. Lee, "Hyperpartisan News and Articles Detection Using BERT and ELMo," 2019 International Conference on Computer and Drone Applications (IConDA), Kuching, Malaysia, 2019, pp. 29-32, doi: <https://doi.org/10.1109/IConDA47345.2019.9034917>

8. M. Qazi, M. U. S. Khan and M. Ali, "Detection of Fake News Using Transformer Model," 2020 3rd International Conference on Computing, Mathematics and Engineering Technologies (iCoMET), Sukkur, Pakistan, 2020, pp. 1-6, doi: <https://doi.org/10.1109/iCoMET48670.2020.9074071>
