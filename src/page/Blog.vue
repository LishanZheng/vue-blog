<template>
  <div>
    <el-row style="min-width: 1000px">
      <el-col :span="14" :offset="2">
        <div>
          <el-card v-for="item in textList" v-bind:key="item.id" style="min-width: 430px;margin-bottom: 25px;padding-bottom: 20px">
            <div style="text-align: center;margin-top: 30px;">
              <router-link to="/blog" @click.native="articleDetail(item)" class="myTitle">{{item.title}}</router-link>
            </div>
            <div style="text-align: center; margin: 10px 0 35px 0">
              <span style="font-size: 12px;color: steelblue">「 发表时间：{{item.time}} 」 「 类别：{{item.sort}} 」 </span>
            </div>
            <mavon-editor
              style="max-width: 800px;border: 0;margin: 0 auto;"
              :value="item.text"
              :subfield = "false"
              :defaultOpen = "'preview'"
              :toolbarsFlag = "false"
              :boxShadow = "false"
              :editable="false"
              :scrollStyle="true"
              :ishljs = "true"
            ></mavon-editor>
<!--            <article v-html=  style="padding-left:40px;color: #303133;font-size: 20px"></article>-->
            <div style="text-align: center;margin-top: 30px;margin-bottom: 20px">
              <el-button type="primary" plain size="small" @click="articleDetail(item)">
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
      <el-col :span="5" :offset="1"  style="max-width: 260px;" :show-overflow-tooltip="true">
        <el-card style="background-color: rgba(195,220,255,0.35);border: 1px solid #72767b">
          <div style="text-align: center;">
            <el-avatar style="height: 100px;width: 100px;background-color: white;border: 3px solid #82848a"
                       src="http://121.196.174.189:8080/static/resources/7.png">
            </el-avatar>
            <h3 style="font-family: '华文细黑', monospace;margin: 10px 0 10px 0;font-size: 20px">
              <a style="color: #ff4d51">A</a>cross
            </h3>
            <span style="font-family: '微软雅黑', serif;font-size: 13px;">神秘的帽子君，果然什么介绍也没有. 但还是留下了一些奇怪的地址。</span>
            <div style="margin-top: 30px">

            <div>
              <a href="https://github.com/LishanZheng" class="link">Github</a>
            </div>
              <a href="https://blog.xuewen.me/" class="link">@搞学问</a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import config from "../constant/PageConfig";

  export default {

      name: "Blog",
      created() {
        this.$emit('pageUrl', [
          {
            name: config.NAV_LIST[0].name,
            path: config.NAV_LIST[0].path,
          }])
      },
      methods: {
        articleDetail(data) {
          let newPath = config.NAV_LIST[0].children[0].path + '/' + data.id
          this.$router.push ({ path: newPath });
          this.$emit('pageUrl', [
            {
              name: config.NAV_LIST[0].name,
              path: config.NAV_LIST[0].path
            },
            {
              name: data.title,
              path: newPath
            },
          ])
        }
      },
      data() {
          return {
            textList:[
              {id:1,title:"人脸检测",time:"2020-07-26",sort:"人工智能",author:"across",text:"## 神经网络模型\n" +
                  "### 初始化设定为Sequential模型 （顺序模型）\n" +
                  "```python\n" +
                  "def build_model(x_train, y_train, x_test, y_test, batch_size=32, epochs=1):\n" +
                  "    model = Sequential()\n" +
                  "```\n" +
                  "\n" +
                  "#### 训练集 x_train（输入） y_train(输出)\n" +
                  "\n" +
                  "#### 测试集 x_test.    y_test" },
              {id:2,title:"人脸检测",time:"2020-07-26",sort:"人工智能",author:"across",text:        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},
              {id:3,title:"人脸检测",time:"2020-07-26",sort:"人工智能",author:"across",text:        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},
              {id:4,title:"人脸检测",time:"2020-07-26",sort:"人工智能",author:"across",text:        "<p>多任务神经网络：分为P-Net、R-Net、和O-Net三层网络结构</p>\n" +
                  "<p>（参考了2016年中国科学院深圳研究院提出的网络模型进行模仿）</p>\n" +
                  "<p>ONet的人脸关键点训练数据和标注文件使用CelebA数据集</p>\n" +
                  "<p>其它使用WIDER FACE数据集</p>\n"},

            ],
          }
      },
    }

</script>

<style scoped>

  .v-show-content {
    background-color: white ;
  }
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
  .myTitle {
    font-size: 32px;
    color: black;
    font-family:"华文细黑",monospace;
    border-bottom:2px solid #f5f7fa;
    width: 0;
    height: 0;
  }
  .myTitle:hover {
    border-bottom-color: #606266;
    color: #606266;
  }
  .link {
    font-family: '华文细黑',cursive;
    color: #72767b;
    font-size: 14px;
  }
  .link:hover {
    color: black;
  }
</style>
