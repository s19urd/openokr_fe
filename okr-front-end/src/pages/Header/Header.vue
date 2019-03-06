<template>
  <div class="header-bg">
    <div class="header container">
      <a href class="logo"></a>
      <div class="header-other">
        <div class="selection">
          <label class="lbl">目标时间：</label>
          <input type="text" class="inp-sm" value="2018年第4季度">
          <i class="icon"></i>
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
      <!-- <div class="most-set">
        <div class="user-set">
          <img src="images/temp/pic.png" class="user-img" alt>
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
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
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
    // background: url(../images/logo.png) no-repeat center;

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
</style>
 
