import axios from 'axios';
import util from "../../libs/util";
export default {
  /**
   * 报价管理列表
   * @returns {*}
   */
  queryStationPage (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    //开始结束时间
    if(condition.startEndDate && condition.startEndDate.length==2){
      condition.startDateStr = condition.startEndDate[0];
      condition.endDateStr = condition.startEndDate[1];
      delete condition.startEndDate;
    }
    return axios.post('/mall/inquiry/price/queryStationPage.json', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 商铺报价申请列表
   * @returns {*}
   */
  queryRentApplyPage (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    //开始结束时间
    if(condition.startEndDate && condition.startEndDate.length==2){
      condition.startDateStr = condition.startEndDate[0];
      condition.endDateStr = condition.startEndDate[1];
      delete condition.startEndDate;
    }
    if(condition.shopTypeIdArr){
      if( condition.shopTypeIdArr.length>=1){
        condition.shopTypeLevelOne = condition.shopTypeIdArr[0];
      }
      if( condition.shopTypeIdArr.length>=2){
        condition.shopTypeLevelTwo = condition.shopTypeIdArr[1];
      }

    }

    return axios.post('/mall/inquiry/price/queryRentApplyPage.json', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 获取商铺报价申请统计信息
   * @returns {*}
   */
  inquiryStatics (paramsVo) {
    let vo = {}
    if(paramsVo.stationId){
      vo.stationId = paramsVo.stationId
    }else if(paramsVo.stationIdStr){
      vo.stationIdStr = paramsVo.stationIdStr
    }
    return axios.get('/mall/inquiry/price/inquiryStatics.json',{
      params:{
        ...vo
      }
    })
  },
  /**
   * 获取商铺报价申请详情
   * @returns {*}
   */
  getRentApplyDetailById (applyId) {
    return axios.get('/mall/inquiry/price/getRentApplyDetailById.json',{
      params: {
        applyId
      }
    })
  },
  /**
   * 商铺列表导出
   * @returns {*}
   */
  exportQueryStationList (vo) {
    //开始结束时间
    if(vo.startEndDate && vo.startEndDate.length==2){
      vo.startDateStr = vo.startEndDate[0];
      vo.endDateStr = vo.startEndDate[1];
      delete vo.startEndDate;
    }
    let pargam = util.jsonToUrl(vo);
    debugger
    window.open(`${process.env.VUE_APP_API_PREFIX}/mall/inquiry/price/exportQueryStationList.htm?${pargam}`,'_blank');
  },
  /**
   * 求租列表导出
   * @returns {*}
   */
  exportInquiryApplyList (vo) {
    //开始结束时间
    if(vo.startEndDate && vo.startEndDate.length==2){
      vo.startDateStr = vo.startEndDate[0];
      vo.endDateStr = vo.startEndDate[1];
      delete vo.startEndDate;
    }
    if(vo.shopTypeIdArr){
      if( vo.shopTypeIdArr.length>=1){
        vo.shopTypeLevelOne = vo.shopTypeIdArr[0];
      }
      if( vo.shopTypeIdArr.length>=2){
        vo.shopTypeLevelTwo = vo.shopTypeIdArr[1];
      }
    }
    if(vo.stationIdList.length>0){
      vo.stationIdStr = vo.stationIdList.join('|');
      delete vo.stationIdList;
    }
    let pargam = util.jsonToUrl(vo);
    window.open(`${process.env.VUE_APP_API_PREFIX}/mall/inquiry/price/exportInquiryApplyList.htm?${pargam}`,'_blank');

  },
}

