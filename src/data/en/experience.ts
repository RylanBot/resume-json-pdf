import { ExperienceData } from '@/types/experience';

const EN_EXPERIENCE: ExperienceData[] = [
    {
        section: 'EDUCATION',
        icon: 'fas fa-graduation-cap',
        items: [
            {
                title: 'xx University, China',
                subtitle: 'B.E. in Software Engineering',
                timeline: 'Sept. 2021 - July 2025',
                tech: '',
                details: [
                    '**GPA:** x.xx/4.0',
                    '**Courses:** Algorithms and Data structure, Computer Network, Database, etc.',
                    '**Awards:** xxxx Competition Gold Prize, xxxx Scholarship'
                ]
            }
        ]
    },
    {
        section: 'INTERNSHIPS',
        icon: 'fa-solid fa-user',
        items: [
            {
                title: 'xxxx Technology Co., Ltd.',
                subtitle: 'xxx Department',
                timeline: 'July 2023 - Sept. 2023',
                tech: '***`Vue` `Ant Design`***',
                details: [
                    'Encapsulated a **xxxxx component** to address the xxxxx problem',
                    'Implemented xxxxx and succeeded in **optimizing xxxxx**',
                    '......',
                    '......'
                ]
            }
        ]
    },
    {
        section: 'PROJECTS',
        icon: 'fas fa-code',
        items: [
            {
                title: 'Online Resume Generator',
                subtitle: 'https://github.com/RylanBot/resume-json-pdf',
                timeline: 'Dec. 2023 - Jan. 2024',
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
                timeline: 'Sept. 2023 - Dec. 2023',
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
                timeline: 'Oct. 2023 - Dec. 2023',
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
        section: 'SKILLS',
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
                    '......',
                    '......'
                ]
            }
        ]
    }
]

export default EN_EXPERIENCE;