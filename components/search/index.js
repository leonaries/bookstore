// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more:{
      type:String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:"",
    loadingCenter:false,

  },
  attached(){
    this.setData({
        historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res =>{
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      console.log(123123)
      if(!this.data.q){
        return
      }
      if (this.isLocked()){
        return
      }
      if(this.hasMore()){
        //加载数据中 下一次进入方法时如果是加载数据中 不发送请求
        this.locked()
        
        bookModel.search(this.getCurrentStart(), this.data.q)
        .then(res => {
          this.setMoreData(res.books)
          //加载数据完成
          this.unLocked()
        }).catch(err =>{
          //加载数据失败
          this.unLocked()
        })
      }
    },
    onCancel(){
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },
    onDelete(){
      this.initialize()
      this._closeResult()
    },
    onConfirm(e){
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = e.detail.text || e.detail.value
      bookModel.search(0,q).then(res =>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q:q
        })
        //加入历史搜索关键词
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },
    _closeResult(){
      this.setData({
        searching: false,
        q: ""
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})
