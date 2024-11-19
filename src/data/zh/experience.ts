import { ExperienceData } from '@/types/experience';

const ZH_EXPERIENCE: ExperienceData[] = [
  {
    section: '专业技能',
    icon: 'PiGear',
    items: [
      {
        title: '前端',
        subtitle: 'Vue/React/RN/Flutter',
        timeline: '2020-至今',
        tech: 'Ant Design + TypeScript + React + Vue3 + Vben',
        details: [
          '扎实的HTML/HTML5、CSS/CSS3、JavaScript基础，熟悉前端性能优化和和浏览器调试',
          '了解前端工程化工具以及流程（如： webpack、Vite），能独立完成前端项目的打包部署与优化',
          '熟悉常用的前端跨平台框架和库（如：React Native、Flutter）以及相关开发工具',
        ],
      },
      {
        title: '后端',
        subtitle: 'Rust/Node',
        timeline: '2020-至今',
        tech: 'Tokio + Nom + Bevy',
        details: [
          '熟悉Rust编程语言和Node开发',
          '了解常用的软件架构模式及软件开发流程',
          '熟悉Linux操作和Shell，能熟练使用基本的编程编译工具',
          '了解音视频相关协议，如rtmp/hls/flv/rtsp等协议',
          '良好的编码习惯和协作能力，熟练git,不定时参与开源,扎实的文档输出能力，时常在博客上发布文章',
          '对技术有激情，喜欢钻研，能快速接受和掌握新技术，有较强的主动学习能力',
        ],
      },
    ],
  },

  {
    section: '教育经历',
    icon: 'PiGraduationCap',
    items: [
      {
        title: '湖南工学院',
        subtitle: '通信工程',
        timeline: '2016.09 - 2020.07',
        tech: '',
        details: [],
      },
    ],
  },
  {
    section: '项目经历',
    icon: 'IoCodeSlashSharp',
    items: [
      {
        title: '个人和开源贡献',
        subtitle: 'https://github.com/rustdesk/rustdesk',
        timeline: '2022.11 - 至今',
        tech: 'Rust + Tokio + Im + Sqlite3',
        details: [
          'rustdesk,一个rust实现的开源远程桌面控制系统。地址:https://github.com/rustdesk/rustdesk',
          'xiu,一个rust实现的流媒体服务器。地址:https://github.com/harlanc/xiu',
          'poem,一个rust实现的web开发框架。地址:https://github.com/zuiyu1998/poem',
        ],
      },
      {
        title: '烟草行业iot系统开发',
        subtitle: '烟草设备的数据采集、状态显示监控、大模型调度',
        timeline: '2022.11 - 至今',
        tech: 'vue + c#',
        details: [
          '负责整套系统的前端实现、业务规范和组件设计',
          '使用mqtt协议实时获取设备数据并展示',
          '使用three.js对设备进行3d化展示和状态监控',
        ],
      },
      {
        title: '深恋',
        subtitle: '一个在各大平台上架的音频聊天软件',
        timeline: '2021.6 - 2021.9',
        tech: 'Rust + Tokio + Im + Sqlite3',
        details: [
          '借助声网实现了一对多聊天房间，支持主持人管理，上下麦等操作',
          '使用svga实现了直播房间的礼物系统',
          '项目正常运营至今',
        ],
      },
    ],
  },
];

export default ZH_EXPERIENCE;
