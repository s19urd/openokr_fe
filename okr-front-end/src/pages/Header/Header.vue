<template>
  <div class="header-bg">
    <div class="header container">
      <a href class="logo"></a>
      <div class="header-other">
        <div class="selection">
          <label class="lbl">目标时间：</label>
          <input type="text" style="display: none" class="inp-sm" value="2018年第4季度">
          <el-select v-model="time" placeholder="请选择">
            <el-option
              v-for="item in TimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <ul class="hearder-menu">
        <li class="active">
          <a href="###">首页</a>
        </li>
        <li>
          <a href="###">OKR</a>
          <div class="menu-list">
            <div class="menu-content clearfix">
              <dl>
                <dd>
                  <a href>
                    <span class="mtitle">审核任务</span>
                  </a>
                </dd>
                <dd>
                  <a href>
                    <span class="mtitle">审核任务</span>
                  </a>
                </dd>
                <dd>
                  <a href>
                    <span class="mtitle">审核任务</span>
                  </a>
                </dd>
                <dd>
                  <a href>
                    <span class="mtitle">审核任务</span>
                  </a>
                </dd>
              </dl>
            </div>
          </div>
        </li>
        <li>
          <a href="###">OKR地图</a>
        </li>
        <li>
          <a href="###">我的消息</a>
        </li>
      </ul>
      <div class="most-set">
        <div class="user-set">
          <img src="../../../public/image/okr/login-profile.png" class="user-img" alt>
          <input type="file">
          <i class="iconfont icon-upload"></i>
        </div>
        <span class="user-name">张三四</span>
        <ul class="most-set-list">
          <li>
            <a href>
              <i class="iconfont icon-out"></i>安全退出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  data () {
    return {
      time: '',
      TimeOptions: [
        {label: '第一季度', value: '第一季度'},
        {label: '第一季度', value: '第二季度'},
        {label: '第一季度', value: '第三季度'},
        {label: '第一季度', value: '第四季度'}
      ]
    }
  }
}
</script>

 <style lang="scss">
.header-bg {
  background: #fff;
  min-width: 1200px;
  border-bottom: 1px solid #e5e6eb;
}
.header {
  height: 60px;

  .logo {
    position: relative;
    float: left;
    width: 152px;
    height: 60px;
    background: url(../../../public/image/okr/okr-logo.png) no-repeat center;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 60px;
      background-color: #e5e6eb;
    }
  }

  .header-other {
    float: left;
    height: 60px;

    .selection {
      position: relative;
      display: inline-block;
      *display: inline;
      box-sizing: border-box;
      padding: 2px 24px 2px 10px;
      height: 28px;
      border: 1px solid #d5dee7;
      border-radius: 3px;
      background-color: #fff;
      vertical-align: middle;
      white-space: normal;
      cursor: pointer;
      zoom: 1;
      height: 60px;
      border: none;

      .lbl {
        height: 56px;
        font-size: 14px;
        line-height: 56px;
        color: #545454;
        border: none;
      }

      > input {
        font-size: 14px;
        color: #545454;
      }

      > .icon {
        height: 60px;
        line-height: 60px;

        &::before {
          color: #ccc;
        }
      }
    }
  }
}

.header {
  .nav {
    float: left;
    margin-left: 30px;
    height: 48px;

    li {
      float: left;
      padding-right: 20px;
      padding-left: 20px;
      height: 48px;
      line-height: 48px;

      a {
        color: #fff;
        font-size: 14px;
      }
    }
  }
}

.header .nav li:hover a,
.header .nav li.active a {
  color: #24c0b9;
}

/*新的菜单*/
.hearder-menu {
  position: absolute;
  left: 420px;
  margin-top: 0;
  margin-bottom: 0;
}
.hearder-menu li {
  position: relative;
  display: inline;
  float: left;
  min-width: 88px;
}
.hearder-menu li > a {
  position: relative;
  z-index: 2;
  display: block;
  padding-right: 9px;
  padding-left: 9px;
  height: 60px;
  color: #545454;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  line-height: 60px;
  background-color: #fff;
}
.hearder-menu li.active > a {
  height: 59px;
  color: #4c84ff;
  border-bottom: 2px solid #4c84ff;
}
.hearder-menu li:hover > a {
  color: #4c84ff;
}
.hearder-menu li .menu-list {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 1;
  display: none;
  min-width: 100%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}

.header .most-set {
  float: right;
  padding: 12px 10px;
  height: 60px;
  position: relative;
  box-sizing: border-box;
  border-left: 1px solid #e5e6eb;
}

.header .most-set .user-set {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 50%;
}
.header .most-set .user-set input {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  z-index: 3;
  width: 100%;
  height: 100%;
  visibility: hidden;
}
.header .most-set .user-set:hover input {
  display: block;
}
.header .most-set .user-set:hover .iconfont {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.header .most-set .user-img {
  display: inline-block;
  width: 36px;
  height: 36px;
}

.header .most-set .user-name {
  color: #555;
  font-size: 14px;
  display: inline-block;
  overflow: hidden;
  min-width: 60px;
  max-width: 74px;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.header .most-set:after {
  content: "\e63d";
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-family: "iconfont";
  text-align: center;
  color: #ccc;
  vertical-align: middle;
}
.most-set .most-set-list {
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 20;
  visibility: hidden;
  width: 100%;
  background: #f5f5f5;
  opacity: 0;
  transition: all 0.15s ease-in-out;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}
.most-set .most-set-list li a {
  display: inline-block;
  width: 100%;
  height: 36px;
  text-indent: 18px;
  line-height: 36px;
  color: #545454;
}
.most-set .most-set-list li a .iconfont {
  margin-right: 15px;
  vertical-align: top;
}
.header .most-set:hover {
  background: #fff;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}
.header .most-set:hover:after {
  transform: rotate(180deg);
}
.header .most-set:hover .most-set-list {
  visibility: visible;
  opacity: 1;
}
.most-set .most-set-list li a:hover {
  background-color: #fff;
  box-shadow: 0 0 8px rgba(76, 93, 130, 0.1);
}
</style>
 
