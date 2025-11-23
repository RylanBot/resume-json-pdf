import type { ProfileData } from '@/types/data';

const ZH_PROFILE: ProfileData = {
    name: 'Xxx',
    avatar: 'https://s2.loli.net/2024/01/09/fJvOraZGAHyI6wW.png',
    footnote: [
        '**求职意向：**前端开发实习生',
        '**到岗时间：**xx 年 x 月'
    ],
    contact: [
        {
            icon: 'fa-solid fa-phone',
            value: '**电话：**139-xxx-xxxxx'
        },
        {
            icon: 'fa-solid fa-envelope',
            value: '**邮箱：**rylanbot@qq.com'
        },
        {
            icon: 'fab fa-weixin',
            value: '**微信：**xxxxxx'
        },
        {
            icon: 'fa-solid fa-rss',
            value: '**博客：**https://rylan.cn'
        },
        {
            icon: 'fab fa-github',
            value: 'https://github.com/RylanBot'
        }
    ]
};

export default ZH_PROFILE;