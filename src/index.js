const commander = require("commander");
const {
  init,
  addKey,
  deleteKey,
  emptyKey,
  list,
  watch,
} = require("../lib/subCommand.js");
const { getKeys } = require("../lib/util.js");
const { compress } = require("../lib/handler.js");
const tinify = require("tinify");

// 主命令
commander
  .version(require("../package").version, "-v, --version")
  .usage("[options]")
  .option("-p, --path <newPath>", "压缩后的图片存放到指定路径（使用相对路径）")
  .option("-a, --add <key>", "添加api-key")
  .option("--delete <key>", "删除指定api-key")
  .option("-l, --list", "显示已储存的api-key")
  .option("-w, --watch", "监控当前目录文件变化")
  .option("--empty", "清空已储存的api-key");

// 子命令
commander
  .command("deep")
  .description("把该目录内的所有图片（含子目录）的图片都进行压缩")
  .action(() => {
    // deepCompress();
    console.log("尚未完成，敬请期待.");
  });

commander.parse(process.argv);

// 选择入口
if (commander.path) {
  // 把图片存放到其他路径
  compress(commander.path);
} else if (commander.add) {
  // 添加api-key
  addKey(commander.add);
} else if (commander.delete) {
  // 删除api-key
  deleteKey(commander.delete);
} else if (commander.list) {
  // 显示api-key
  list();
} else if (commander.watch) {
  //监控当前目录文件变化
  watch();
} else if (commander.empty) {
  // 清空api-key
  emptyKey();
} else {
  // 主命令
  if (typeof commander.args[0] === "object") {
    // 子命令
    // return;
  }
  if (commander.args.length !== 0) {
    console.log("unknown command，please try minijoy-tinypng -h");
    // return;
  }
  if (getKeys().length === 0) {
    console.log("Please initialize your api-key");
    init();
  } else {
    compress();
  }
}
