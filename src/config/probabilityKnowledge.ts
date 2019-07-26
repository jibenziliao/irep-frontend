/**
 * 概率检索模型实验--温故知新富文本数据
 */
export const probabilityKnowledge = [
  {
    title: '简介',
    content: `
      <p style="text-indent: 2em;">
        概率检索模型是当前信息检索领域效果最好的模型之一，它基于对已有反馈结果的分析，根据贝叶斯原理为当前查询排序。概率检索模型的基本原理与朴素贝叶斯分类是一样的。
      </p>
    `
  },
  {
    title: '基本思想',
    content: `
      <p style="text-indent: 2em;">
        给定一个用户查询，若搜索系统能在搜索结果排序时按照文档和用户查询的相关性由高到低排序，那么这个搜索系统的准确性是最优的。
      </p>
    `
  },
  {
    title: '朴素贝叶斯算法的原理',
    content: `
      <p style="text-indent: 2em;">
        对于测试元组X，最终目的是要计算对于不同的类Ci，计算后验概率p(Ci|X)，哪个类最大，就属于哪个类。而为了计算p(Ci|X)，则需要用贝叶斯公式做如下分解：
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHIXL.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 5</strong> p(Ci X)</p>
      <p style="text-indent: 2em;">
        因为要比较大小，所以忽略p(X)，只需要考虑分子中p(X|Ci)p(Ci)，其中p(Ci)可以通过抽样得到，那么问题转化为计算p(X|Ci)，p(X|Ci)代表X在类Ci中的概率。如果X由n个相互之间无关的属性组成，那么这个概率一般如下计算：
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grH68i.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 6</strong> p(Ci X)</p>
    `
  },
  {
    title: 'BM25模型',
    content: `
      <p style="text-indent: 2em;">BM25模型为文档Di每个索引项tj分配了一个系数Bi,j，由如下公式计算生成：</p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHn2W.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 7</strong>Bij</p>
      <p style="text-indent: 2em;">
        其中，K1和b为经验参数，用于调节词频和文档长度在权重计算中起到的作用，一般来讲，K1取1，b取0.75已经被证明是合理的假设。而fi,j则为词wj在文档Di中的词频，avg_doclen为平均文档长度。计算得到了系数Bi,j，就可以基Robertson-Sparck Jones等式最终计算出文档关于查询的排序：
      </p>
      <p style="text-align: center;">
        <img src="https://t1.picb.cc/uploads/2019/07/26/grHe1w.png" style="max-width: 100%;">
      </p>
      <p style="text-align: center;"><strong>图表 8</strong>sim(Djq)</p>
    `
  },
  {
    title: '实现步骤',
    content: `
      <p>1.求索引项</p>
      <p>2.求系数Bij</p>
      <p>3.计算相似度</p>
      <p>4.按相似度降序排序</p>
    `
  },
  {
    title: '优点',
    content: `<p style="text-indent: 2em;">文档可以按照他们相关概率递减的顺序来计算秩（rank）。</p>`
  },
  {
    title: '缺点',
    content: `
      <p style="text-indent: 2em;">
        开始时需要猜想把文档分为相关和不相关的两个集合，实际上这种模型没有考虑索引术语在文档中的频率（因为所有的权重都是二元的），而索引术语都是相互独立的。
      </p>
    `
  }
]
