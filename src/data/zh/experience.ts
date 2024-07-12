import { ExperienceData } from '@/types/experience';

const ZH_EXPERIENCE: ExperienceData[] = [
    {
        section: '教育经历',
        icon: 'fas fa-graduation-cap',
        items: [
            {
                title: 'xx 大学',
                subtitle: '软件工程',
                timeline: '2021.09 - 2025.07',
                tech: '',
                details: [
                    '**相关课程：**算法与数据结构（xx），计算机网络（xx），软件测试（xx），数据库（xx）等',
                    '**荣誉奖项：**第 x 届 xxxx 大赛金奖，xx 大学 xxxx 奖学金',
                    '**英语水平：**CET-4（xxx），CET-6（xxx）'
                ]
            }
        ]
    },
    {
        section: '实习经历',
        icon: 'fa-solid fa-user',
        items: [
            {
                title: 'xxxx 技术有限公司',
                subtitle: 'xxx 部门',
                timeline: '2023.07 - 2023.09',
                tech: "***`Vue` `Ant Design`***",
                details: [
                    '封装 **xxxxx 组件**，解决 xxxxx 问题',
                    '使用 xxxxx，**优化 xxxxx**',
                    '......',
                    '......'
                ]
            }
        ]
    },
    {
        section: '项目经历',
        icon: 'fas fa-code',
        items: [
            {
                title: '在线简历生成器',
                subtitle: 'https://github.com/RylanBot/resume-json-pdf',
                timeline: '2023.12 - 2024.01',
                tech: '***`React` `TypeScript` `Tailwind CSS`***',
                details: [
                    '......',
                    '......',
                    '......'
                ]
            },
            {
                title: 'xxxxxx',
                subtitle: '',
                timeline: '2023.09 - 2023.12',
                tech: '***`xxx` `xxxx` `xxxxx`***',
                details: [
                    '......',
                    '......',
                    '......',
                    '......'
                ]
            },
            {
                title: 'xxxxxx',
                subtitle: '',
                timeline: '2023.10 - 2023.12',
                tech: '***`xxx` `xxxx` `xxxxx`***',
                details: [
                    '......',
                    '......',
                    '......'
                ]
            }
        ]
    },
    {
        section: '专业技能',
        icon: 'fas fa-cog',
        items: [
            {
                title: '',
                subtitle: '',
                timeline: '',
                tech: '',
                details: [
                    '......',
                    '......',
                    '......',
                    '......'
                ]
            }
        ]
    }
];

export default ZH_EXPERIENCE;