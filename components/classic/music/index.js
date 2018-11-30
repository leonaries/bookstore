// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png'
  },

  detached:function (){
    mMgr.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(e){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    
    }
  }
})
