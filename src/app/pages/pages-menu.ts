import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'nb-home',
        link: '/pages/dashboard',
        home: true,
    },
    {
        title: 'FEATURES',
        group: true,
    },
    {
        title: 'Settings',
        icon: 'ion-settings',
        children: [
            {
                title: '許可証発行規則設定',
                link: '/pages/settings/rules',
            },
        ],
    },
    {
        title: 'Telemetries',
        icon: 'nb-bar-chart',
        children: [
            {
                title: '許可証測定データ',
                link: '/pages/telemetries/passports',
            },
        ],
    },
    {
        title: 'Tests',
        icon: 'nb-gear',
        children: [
            {
                title: '許可証発行テスター',
                link: '/pages/tests/passports',
            },
        ],
    },
];
