<template>
  <div style="margin-left: 10px;">
    <el-row>
      <el-col :span="16">
        <div style="margin-left: 120px">
          <el-card v-for="item in textList" v-bind:key="item.id" style="width: 800px;margin-bottom: 25px;padding-bottom: 20px">
            <div style="text-align: center;margin-top: 30px;">
              <router-link :to="'/article/'+item.id" id="title">{{item.title}}</router-link>
            </div>
            <div style="text-align: center; margin: 10px 0 35px 0">
              <span style="font-size: 12px;color: steelblue">「 发表时间：{{item.time}} 」 「 类别：{{item.sort}} 」 </span>
            </div>
            <article v-html=item.text  style="padding-left:40px;color: #303133;font-size: 20px"></article>
            <div style="text-align: center;margin-top: 30px;margin-bottom: 20px">
              <el-button type="primary" plain size="small" @click="articleDetail(item.id)">
                阅读全文 >
              </el-button>
            </div>
            <el-divider content-position="right" id="divider" style="background-color: black;" >{{item.author}}</el-divider>
          </el-card>
          <div class="block" style="text-align: center;margin-top: 80px;">
            <el-divider></el-divider>
            <el-pagination
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="7" :offset="1"  style="width: 200px;overflow:auto">
        <el-card>
          123
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "Blog",
      created() {
        this.$emit('pageUrl', '/blog')
      },
      methods: {
        articleDetail(key) {
          this.$router.push({path: '/article/' + key})
        }
      },
      data() {
          return {
            textList:[
              {id:1,title:"人脸检测",time:"2020-07-26",sort:"java",author:"across",text:"<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},
              {id:2,title:"人脸检测",time:"2020-07-26",sort:"java",author:"across",text:        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},
              {id:3,title:"人脸检测",time:"2020-07-26",sort:"java",author:"across",text:        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},
              {id:4,title:"人脸检测",time:"2020-07-26",sort:"java",author:"across",text:        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},

            ],
            md: [{text: "<title>郑力煽-人脸检测网络概述</title></head>\n" +
        "<body><h2>人脸检测 + 关键点检测</h2>\n" +
        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
        "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
        "<h2>训练数据</h2>\n" +
        "<p>训练数据来自　<strong><a href='http://mmlab.ie.cuhk.edu.hk/projects/WIDERFace/'>WIDER FACE</a></strong> 和 <strong><a href='http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html'>CelebA</a></strong></p>\n" +
        "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
        "<p>其它使用WIDER FACE数据集</p>\n" +
        "<p>&nbsp;</p>\n" +
        "<h2>预处理</h2>\n" +
        "<h4>构建图像金字塔</h4>\n" +
        "<p>将图像进行不同尺度的变换，构建图像金字塔，以适应不同大小的人脸的进行检测</p>\n" +
        "<h4>PRelu</h4>\n" +
        "<p>在网络中采用的激活函数是PRelu，带有参数的带有参数的Relu，相对于Relu滤除负值的做法，PRule对负值进行了添加参数而不是直接滤除，这种做法会给算法带来更多的计算量和更多的过拟合的可能性，但是由于保留了更多的信息，也可能是训练结果拟合性能更好。</p>\n" +
        "<h2>第一层 P-Net</h2>\n" +
        "<p>Proposal Network</p>\n" +
        "<h5>基本思想：使用较为浅层、较为简单的CNN网络快速生成人脸候选窗口</h5>\n" +
        "<h5>结构：12x12x3 输入层、3个卷积层、3个输出层</h5>"}],
            text01: "<body><h2>人脸检测 + 关键点检测</h2>\n"
          }
      },
    }

</script>

<style scoped>
  #divider{
    margin: 8px 0;
    background: 0 0;
    border-top: 1px dashed #e8eaec;
  }

  a {
    text-decoration: none;
  }

  .el-button {
    color: #8c939d;
    background-color: #f0f7ff;
    border-color: #e8eaec;
  }
  .el-button:hover {
    background-color: #3a8ee6;
    border-color: #e8eaec;
  }
  .el-button:focus {
    background-color: black;
    border-color: #e8eaec;
  }
  #title {
    font-size: 32px;
    color: black;
    font-family:"华文细黑",monospace;
    border-bottom:2px solid #f5f7fa;
  }
</style>
