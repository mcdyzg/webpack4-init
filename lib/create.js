#!/usr/bin/env node

const inquirer = require('inquirer')
const clone = require('./utils/clone.js')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const ora = require('ora')

module.exports = async (projectName, presetRepo) => {
	let Repo = presetRepo || 'mcdyzg/webpack4-react'

	let Branch = presetRepo ? '' : '#production'

	// 下载仓库
	const spinner = ora('project is downloading')
	spinner.start()
	let flag = await clone(Repo, Branch, projectName)
	spinner.stop()

	// clone成功
	if (flag) {
		let cmdStr = `cd ${projectName} && git init`
		exec(cmdStr, (error, stdout, stderr) => {
			if (error) {
				console.log(error)
				process.exit()
			} else {
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
