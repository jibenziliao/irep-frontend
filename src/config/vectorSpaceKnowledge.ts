/**
 * 空间向量模型实验--温故知新富文本数据
 */
export const vectorSpaceKnowledge = [
  {
    title: '简介',
    content: `
      <p><strong>向量空间模型（vector space model 简称：VSM）：</strong>一系列文档在同一向量空间中的表示被称为向量空间模型。其把对文本内容的处理简化为向量空间中的向量运算，并且它以空间上的相似度表达语义的相似度。</p>
      <p><strong>文档频率（document</strong><strong>&nbsp;</strong><strong>frequency）</strong>：出现词项的t文档数目，也就是每个倒排记录表的长度。</p>
      <p><strong>文档频率（document</strong><strong>&nbsp;</strong><strong>frequency）</strong>：出现词项的t文档数目，也就是每个倒排记录表的长度。</p>
      <p><strong>逆文档频率（inverse</strong><strong>&nbsp;</strong><strong>document</strong><strong>&nbsp;</strong><strong>frequency）</strong>：因为本身较大，需要将其映射到一个较小的范围。设文档集中所有文档数为，词项为：</p>
    `
  },
  {
    title: '实现步骤',
    content: `
      <p>1.计算idft：利用倒排索引表中的文档频率dft参数求出各个词项逆文档频率</p>
      <p>逆文档频率因子（idft）&ndash;全局（文档集合）</p>
      <p>计算公式：idft=log2Ndft</p>
      <p>N代表文档集合中的文档总数</p>
      <p>2.计算词频因子:将查询语句也看作一个文档，分别计算查询语句与文档集中各词的词频因子。</p>
      <p>词频因子（tft,d)&ndash;局部（一个文档）：最简单的就是直接利用词频数tft,d作为词频因子值。</p>
      <p>平滑公式：tft,d&#39;=1+log(tft,d)</p>
      <p>
        3.计算向量：按照词典中的顺序建立各个文档的词项向量，向量中每一个词的权值一般采用TF-IDF框架计算。（查询语句也看作一个文档进行计算）
      </p>
      <p>TF*IDF框架：Weightt=tft,d&#39;&times;idft</p>
      <p>4.相似度计算：查询与某文档的相似度为查询向量和文档向量余弦值。（或查询向量的单位向量与文档向量的单位向量的点积）</p>
      <p style="text-align: center">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grGdXr.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 4</strong> cosine similarity</p>
      <p style="text-align: left;">5.按照文档和查询的相似性得分从高到低排序作为搜索结果。</p>
    `
  },
  {
    title: '优点',
    content: `<p>基于线性代数的简单模型；词组的权重不是二元的；允许计算文档和索引之间的连续。</p>`
  },
  {
    title: '缺点',
    content: `
      <p>
        不适用于较长的文件；检索词组必须与文件中出现的词组精确匹配；语义敏感度不佳；易导致&ldquo;假阴性匹配&rdquo;；忽略词组间的相关性。
      </p>
    `
  }
]
