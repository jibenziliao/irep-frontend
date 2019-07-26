/* eslint-disable no-irregular-whitespace */
/**
 * 分析检索模型性能--温故知新富文本数据
 */
export const evaluationKnowledge = [
  {
    title: '简介',
    content: `
      <p style="text-indent: 2em;">
        采用相关的指标对布尔检索模型、向量空间模型、概率检索模型以及语言检索模型的检索结果进行测评。
      </p>
    `
  },
  {
    title: '评价标准数据集',
    content: `
      <p style="text-indent: 2em;">
        本研究采用搜狗实验室提供的标准数据集。
      </p>
    `
  },
  {
    title: '指标介绍',
    content: `
      <p><strong>1、针对单个查询式的检索性能评价指标</strong></p>
      <p>
        （1）查准率（P值）：查准率=检出的相关文档数/检出文档数；P@5、p@10、p@20分别表示检索结果的前5个、前10个以及前20个的查准率。
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHuE8.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 9</strong>P</p>
      <p>
        （2）查全率（R值）：召回率=检出的相关文档数/相关文档数；recall@5、recall@10、recall@20分别表示检索结果的前5个、前10个以及前20个的召回率。
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHceg.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 10</strong>R</p>
      <p>
        （3）F1值：F1值是查准率和查全率的调和平均值，此时查准率和查全率的权重一样。
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHm7X.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 11</strong>F1</p>
      <p>（4）平均查准率（AP值）：对不同查全率点上的查准率进行平均。</p>
      <p>
        （5）NDCG值：NDCG是归一化折损累计增益，其根据文档在检索结果列表中的位置来测量文档的有用性或增益。增益从结果列表的顶部累积到底部，每个结果的增益在较低等级处打折，然后进行求和，最后进行归一化处理；NGDC@5、NGDC@10、NGDC@20分别表示检索结果的前5个、前10个以及前20个的归一化折损累计增益。
      </p>
      <p><strong>累计增益（CG）</strong></p>
      <p style="text-indent: 2em;">
        CG，cumulative gain，是DCG的前身，只考虑到了相关性的关联程度，没有考虑到位置的因素。它是一个搜素结果相关性分数的总和。指定位置p上的CG为：
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grH19G.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 12</strong>CG</p>
      <p style="text-indent: 2em;">
        reli 代表i这个位置上的相关度。
      </p>
      <p><strong>折损累计增益（DCG）</strong></p>
      <p style="text-indent: 2em;">
        DCG， Discounted 的CG，就是在每一个CG的结果上处以一个折损值，为什么要这么做呢？目的就是为了让排名越靠前的结果越能影响最后的结果。假设排序越往后，价值越低。到第i个位置的时候，它的价值是 1/log2(i+1)，那么第i个结果产生的效益就是 reli * 1/log2(i+1)，所以：
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHGwy.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 13</strong>DCG</p>
      <p><strong>归一化折损累计增益（NDCG）</strong></p>
      <p style="text-indent: 2em;">
        NDCG， Normalized 的DCG，由于搜索结果随着检索词的不同，返回的数量是不一致的，而DCG是一个累加的值，没法针对两个不同的搜索结果进行比较，因此需要除以IDCG进行归一化处理。
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHH8j.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 14</strong>NDCG</p>
      <p style="text-indent: 2em;">
        IDCG为理想情况下最大的DCG值。
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHrBc.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 15</strong>IDCG</p>
      <p style="text-indent: 2em;">
        其中 |REL| 表示，结果按照相关性从大到小的顺序排序，取前p个结果组成的集合。也就是按照最优的方式对结果进行排序。
      </p>
      <p><strong>2、平均检索性能评价指标</strong></p>
      <p style="text-indent: 2em;">平均检索性能评价指标，是对多个查询式（本系统使用10个）的检索性能评价指标求均值得到。</p>
    `
  }
]
