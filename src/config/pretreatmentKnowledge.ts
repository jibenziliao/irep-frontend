/**
 * 预处理实验--温故知新富文本数据
 */
export const pretreatmentKnowledge = [
  {
    title: '相关术语',
    content: `
      <p><strong>词项（term）</strong>是索引的单位，通常可以用词来表示。</p>
      <p><strong>文档（document）</strong>信息系统检索的对象。</p>
      <p><strong>语言预处理目的：</strong>建立词条的等价类，其中每个等价类对应一个词项，这些词项最终用来建立文档索引。</p>
      <p><strong>词条化：</strong>将给定的字符序列拆分成一系列子序列的过程，其实每个子序列称为一个词条（token）。</p>
      <p><strong>中文文档预处理流程：</strong>确定索引的文档单位（document unit）、词条化、去停用词、去标点。（说明：一般的检索系统中默认每篇文档就是固定的检索单位）</p>
    `
  },
  {
    title: '分词',
    content: `<p><strong>中文分词</strong></p>
              <p>
              <strong>中文分词（Chinese word segmentation）</strong>是将一个汉字序列切分成一个个单独的词；分词是中文词条化的解决办法。
              </p>
              <p>
                中文分词的作用：中文分词是文本挖掘的基础，对于输入的一段中文，成功的进行中文分词，可以达到电脑自动识别语句含义的效果。
              </p>
              <p>现有的分词算法可分为三大类：基于字符串匹配的分词方法、基于理解的分词方法和基于统计的分词方法。</p>
              <p><strong>字符匹配</strong></p>
              <p style="text-indent: 2em;">
                这种方法又叫做机械分词方法，它是按照一定的策略将待分析的汉字串与一个&ldquo;充分大的&rdquo;机器词典中的词条进行配，若在词典中找到某个字符串，则匹配成功（识别出一个词）。按照扫描方向的不同，串匹配分词方法可以分为正向匹配和逆向匹配；按照不同长度优先匹配的情况，可以分为最大（最长）匹配和最小（最短）匹配；常用的几种机械分词方法如下：
              </p>
              <p>1）正向最大匹配法（由左到右的方向）；</p>
              <p>2）逆向最大匹配法（由右到左的方向）；</p>
              <p>3）最少切分（使每一句中切出的词数最小）；</p>
              <p>4）双向最大匹配法（进行由左到右、由右到左两次扫描）</p>
              <p><strong>理解法</strong></p>
              <p style="text-indent: 2em;">
                这种分词方法是通过让计算机模拟人对句子的理解，达到识别词的效果。其基本思想就是在分词的同时进行句法、语义分析，利用句法信息和语义信息来处理歧义现象。它通常包括三个部分：分词子系统、句法语义子系统、总控部分。在总控部分的协调下，分词子系统可以获得有关词、句子等的句法和语义信息来对分词歧义进行判断，即它模拟了人对句子的理解过程。这种分词方法需要使用大量的语言知识和信息。由于汉语语言知识的笼统、复杂性，难以将各种语言信息组织成机器可直接读取的形式，因此目前基于理解的分词系统还处在试验阶段。
              </p>
              <p><strong>统计法</strong></p>
              <p style="text-indent: 2em;">
                从形式上看，词是稳定的字的组合，因此在上下文中，相邻的字同时出现的次数越多，就越有可能构成一个词。因此字与字相邻共现的频率或概率能够较好的反映成词的可信度。可以对语料中相邻共现的各个字的组合的频度进行统计，计算它们的互现信息。定义两个字的互现信息，计算两个汉字X、Y的相邻共现概率。互现信息体现了汉字之间结合关系的紧密程度。当紧密程度高于某一个阈值时，便可认为此字组可能构成了一个词。这种方法只需对语料中的字组频度进行统计，不需要切分词典，因而又叫做无词典分词法或统计取词方法。但这种方法也有一定的局限性，会经常抽出一些共现频度高、但并不是词的常用字组，例如&ldquo;这一&rdquo;、&ldquo;之一&rdquo;、&ldquo;有的&rdquo;、&ldquo;我的&rdquo;、&ldquo;许多的&rdquo;等，并且对常用词的识别精度差，时空开销大。实际应用的统计分词系统都要使用一部基本的分词词典（常用词词典）进行串匹配分词，同时使用统计方法识别一些新的词，即将串频统计和串匹配结合起来，既发挥匹配分词切分速度快、效率高的特点，又利用了无词典分词结合上下文识别生词、自动消除歧义的优点。
              </p>
              <p style="text-indent: 2em;">
                另外一类是基于统计机器学习的方法。首先给出大量已经分词的文本，利用统计机器学习模型学习词语切分的规律（称为训练），从而实现对未知文本的切分。我们知道，汉语中各个字单独作词语的能力是不同的，此外有的字常常作为前缀出现，有的字却常常作为后缀（&ldquo;者&rdquo;&ldquo;性&rdquo;），结合两个字相临时是否成词的信息，这样就得到了许多与分词有关的知识。这种方法就是充分利用汉语组词的规律来分词。这种方法的最大缺点是需要有大量预先分好词的语料作支撑，而且训练过程中时空开销极大。
              </p>
              <p style="text-indent: 2em;">
                到底哪种分词算法的准确度更高，目前并无定论。对于任何一个成熟的分词系统来说，不可能单独依靠某一种算法来实现，都需要综合不同的算法。例如，海量科技的分词算法就采用&ldquo;复方分词法&rdquo;，所谓复方，就是像中西医结合般综合运用机械方法和知识方法。对于成熟的中文分词系统，需要多种算法综合处理问题。
              </p>`
  },
  {
    title: '去停用词',
    content: `<p><strong>概念：</strong></p>
              <p>
                停用词(Stop Words) ，词典译为&ldquo;电脑检索中的虚字、非检索用字&rdquo;。在检索过程中，为节省存储空间和提高搜索效率，搜索引擎在索引页面或处理搜索请求时会自动忽略某些字或词，这些字或词即被称为Stop Words(停用词)。
              </p>
              <p>通常意义上，停用词(Stop Words)大致可分为如下两类：</p>
              <p>
                1、使用十分广泛，甚至是过于频繁的一些单词。比如英文的&ldquo;i&rdquo;、&ldquo;is&rdquo;、&ldquo;what&rdquo;，中文的&ldquo;我&rdquo;、&ldquo;就&rdquo;之类词几乎在每个文档上均会出现，查询这样的词搜索引擎就无法保证能够给出真正相关的搜索结果，难于缩小搜索范围提高搜索结果的准确性，同时还会降低搜索的效率。因此，在真正的工作中，Google和百度等搜索引擎会忽略掉特定的常用词，在搜索的时候，如果我们使用了太多的停用词，也同样有可能无法得到非常精确的结果，甚至是可能大量毫不相关的搜索结果。
              </p>
              <p>
                2、文本中出现频率很高，但实际意义又不大的词。这一类主要包括了语气助词、副词、介词、连词等，通常自身并无明确意义，只有将其放入一个完整的句子中才有一定作用的词语。如常见的&ldquo;的&rdquo;、&ldquo;在&rdquo;、&ldquo;和&rdquo;、&ldquo;接着&rdquo;之类，比如&ldquo;SEO研究院是原创的SEO博客&rdquo;这句话中的&ldquo;是&rdquo;、&ldquo;的&rdquo;就是两个停用词。
              </p>
              <p><strong>Stop Words对检索的影响</strong></p>
              <p>
                文档中如果大量使用Stop words容易对页面中的有效信息造成噪音干扰，所以搜索引擎在运算之前都要对所索引的信息进行消除噪音的处理。了解了Stop Words，在网页内容中适当地减少停用词出现的频率，可以有效地帮助我们提高关键词密度，在网页标题标签中避免出现停用词能够让所优化的关键词更集中、更突出。
              </p>`
  },
  {
    title: '去标点',
    content: `<p>去除文档中的标点符号。</p>`
  },
  {
    title: '词云',
    content: `<p style="text-indent: 2em;">
                &ldquo;词云&rdquo;就是对网络文本中出现频率较高的&ldquo;关键词&rdquo;予以视觉上的突出，形成&ldquo;关键词云层&rdquo;或&ldquo;关键词渲染&rdquo;，从而过滤掉大量的文本信息，使浏览网页者只要一眼扫过文本就可以领略文本的主旨。
              </p>`
  }
]
