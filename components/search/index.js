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
    loading:false
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
      if(this.data.loading){
        return
      }

      this.data.loading = true
      if(this.hasMore()){
        bookModel.search(this.getCurrentStart(), this.data.q)
        .then(res => {
          this.setMoreData(res.books)
          this.data.loading = false
        })
      }
    },
    onCancel(){
      this.triggerEvent('cancel',{},{})
    },
    onDelete(){
      this.setData({
        searching:false,
        q:""
      })
    },
    onConfirm(e){
      this.setData({
        searching: true
      })
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
      })
    }
  }
})
