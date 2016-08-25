import React from 'react';
import style from './index.css';
import cx from 'classNames';

/**
 * 分页组件，
 * 组件不保管任何状态，所有的状态由父保存，
 * 使用方法: 在父组件中引入本组件并传入相同格式的options
 * options = {
 *   pageLimist: 9, //共显示出9个页数  最好为奇数个，使当前页居中
 *   curPage: 1, //当前所处第1页
 *   maxPage:20 ,//后台数据共有20页
 *   isLoading: false //加载状态,加载中五法继续点击换页
 *   handleClickPage : function(page){} //点击页的回调函数,传回去页数
 * }
 */
    // 拷贝从这里开始
    // options = {
    //      pageLimist: 9,
    //      curPage: 1, 
    //      maxPage:20 ,
    //      isLoading: false,
    //      handleClickPage 
    // }
const Page = React.createClass({
        getDefaultProps(){
            return {
                options:{
                    pageLimit: 9,
                    curPage : 17,
                    maxPage : 30,
                    isLoading: false
                }
            }
        },
        getInitialState(){
            return {
            }
        },
        componentWillReceiveProps(nextProps){
            this.setState({isLoading: nextProps.isLoading});
        },
        handleClickPage(page,event){
            if(!this.state.isLoading) {
                console.log(page);
                //this.props.options.handleClickPage();
            }
        },
        render(){
            let arr = [];
            let limit = this.props.options.pageLimit || 9;
            let curPage = this.props.options.curPage || 1;
            let maxPage = this.props.options.maxPage || 10;


            let pageStart = curPage - (limit - 1) / 2;
            let pageEnd = curPage + (limit - 1) / 2 - maxPage;
            
            pageStart = pageStart > 0? pageStart: 1; 
            pageStart = pageEnd > 0? pageStart - pageEnd : pageStart;

            for(let i = pageStart, length = pageStart + limit; i < length; i++) {
                arr.push(i);
            }
            let html = (<div className={cx(style['page-wrap'])}>
                <ul>
                    <li onClick = {this.handleClickPage.bind(this,1)}><a className = {cx(style['page-fisrt'])}>第一页</a></li>
                    <li onClick = {this.handleClickPage.bind(this,curPage - 1)}><a className = {cx(style['page-prev'])}>上一页</a></li>
                    {
                        arr.map((index) => {
                            return (<li key = {index} data-index = {index} onClick = {this.handleClickPage.bind(this,index)}>
                                <a className = {cx(style['page-index'],
                                    {[style['cur-page']]:curPage == index})}
                                >
                                    {index}</a>
                            </li>);
                        })
                    }
                    <li onClick = {this.handleClickPage.bind(this,curPage + 1)}><a className = {cx(style['page-next'])}>下一页</a></li>
                    <li onClick = {this.handleClickPage.bind(this,maxPage)}><a className = {cx(style['page-last'])}>最后一页</a></li>
                    <li>{'共' + maxPage + '页'}</li>
                </ul>
            </div>);
            
            return html;
        }
});

export default Page;
