const downloadRepo = require('download-git-repo')

// const choose = (repo) =>{
//     return new Promise(async (resolve,reject)=>{
//         // 要克隆的仓库名
//         let repoName = repo.split('/')[1]
//         // 当前文件夹路径
//         let currentDir = process.cwd()
//         // 克隆好的文件夹名称
//         let repoPath = path.resolve(currentDir,repoName)
//
//
//
//
//         // 判断当前文件夹下时候已存在同名库
//         if(fs.existsSync(repoPath)) {
//             const answers = await inquirer.prompt({
//                 type: 'answers',
//                 name: 'ifRemove',
//                 message: '已存在同名仓库，是否删除并继续？(y/N)'
//             })
//             if(answers.ifRemove === 'y') {
//                 // 删除存在库并继续创建
//                 fse.remove(repoPath)
//
//                 // 下载仓库
//                 let flag = await download(repo,repoName)
//                 flag ? resolve() :reject()
//             }else{
//                 reject('取消创建')
//             }
//         }else{
//             // 下载仓库
//             let flag = await download(repo,repoName)
//             flag ? resolve() :reject()
//         }
//     })
// }

// 根据传入的仓库名称和分支，clone项目到指定的文件夹里
module.exports = async (repo, branch, projectName) => {
	// 合并仓库名和指定分支
	let repoUrl = `${repo}${branch}`
	// console.log(`${repoUrl} is downloading =========>`,)

	let flag = await new Promise((resolve, reject) => {
		downloadRepo(repoUrl, projectName, function(err) {
			if (err) {
				console.log(repo, 'download fail')
				reject(false)
			} else {
				console.log('download success')
				resolve(true)
			}
		})
	}).catch(err => err)
	return flag
}
