import React from 'react'
import { observer, inject } from 'mobx-react'
import Glyphicon from '../Glyphicon/'
import cls from 'classnames'
import './menu.scss'

@inject('files')
@observer
export default class Menu extends React.Component {

    toggleCategory = (type) => {
        this.props.files.setCategory(type)
    }

    render() {
        return (
            <ul className="menu">
                <li><a><Glyphicon name="folder-open" onClick={() => {this.toggleCategory(0)}}/> 全部文件</a>
                    <ul>
                        <li><a className={cls({'active':this.props.files.category === 3})} onClick={()=>{this.toggleCategory(3)}}><Glyphicon name="image" /> 图片</a></li>
                        <li><a className={cls({'active':this.props.files.category === 4})} onClick={()=>{this.toggleCategory(4)}}><Glyphicon name="file-text" /> 文档</a></li>
                        <li><a className={cls({'active':this.props.files.category === 1})} onClick={()=>{this.toggleCategory(1)}}><Glyphicon name="film" /> 视频</a></li>
                        <li><a className={cls({'active':this.props.files.category === 7})} onClick={()=>{this.toggleCategory(7)}}><Glyphicon name="magnet" /> 种子</a></li>
                        <li><a className={cls({'active':this.props.files.category === 2})} onClick={()=>{this.toggleCategory(2)}}><Glyphicon name="headphones" /> 音乐</a></li>
                        <li><a className={cls({'active':this.props.files.category === 5})} onClick={()=>{this.toggleCategory(5)}}><Glyphicon name="windows8" /> 应用</a></li>
                        <li><a className={cls({'active':this.props.files.category === 6})} onClick={()=>{this.toggleCategory(6)}}><Glyphicon name="delicious" /> 其他</a></li>
                    </ul>
                </li>
                <li><a><Glyphicon name="share2" /> 我的分享</a>
                </li>
            </ul>
        )
    }
}