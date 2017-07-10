export interface RoomDetail {
  fjmc: string;//房间名称
  fjjg: number;//房间价格
  fjmj: number;//房间面积
  chcx: string;//房间朝向
  sslc: number;//所属楼层
  fjdz: string;//房间地址
  fjtp: { imgName: string; imgPath: string;}[]//房间图片
}
