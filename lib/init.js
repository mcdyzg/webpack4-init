#!/usr/bin/env node

const inquirer = require('inquirer')
const clone = require('./utils/clone.js')
const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const branchList = [
    {
        name:'react+antd+redux+splitChunks',
        // 分支名称，不写默认master
        value:''
    },
    {
        name:'react+antd+redux+dll',
        value:'#dll'
    },
    {
        name:'react+antd+redux+externals',
        value:'#externals'
    },
]


module.exports = async () => {
    // 输入项目名称
    const answers = await inquirer.prompt([{
        type: 'input',
        name: 'projectName',
        message: 'Preject Name',
        validate: function(value){
            if(!value) return 'Please write a preject name'

            // 当前文件夹路径
            const currentDir = process.cwd()
            // 要建的项目的文件夹完整路径
            const repoPath = path.resolve(currentDir,value)

            // 判断当前文件夹下是否已存在同名库
            if(fs.existsSync(repoPath)) return `${value} has been existes`

            return true
            // // 下载仓库
            // let flag = await download(repo,repoName)
            // flag ? resolve() :reject()
        },
    },{
        type: 'list',
        name: 'projectBranch',
        message: 'Please choose a bundle mode?',
        choices: branchList,
    }])

    // // 当前执行命令的文件夹名称
    // const currFileName = process.cwd().split('\/').pop()

    const {
        projectBranch,
        projectName
    } = answers


    let flag = await clone('mcdyzg/webpack4-react',projectBranch,projectName)

    // clone成功
    if(flag) {
        let cmdStr = `cd ${projectName} && git init`
        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }else{
                const success = `
*******************************************
        ${projectName} has been created
        then you need
            1. cd ${projectName}
            2. npm install
            3. npm start
*******************************************
                `
                console.log(success)
            }
        })
    }
}
