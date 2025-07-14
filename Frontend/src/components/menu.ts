import { Menus } from '@/delete/types/menu';

export const menuData: Menus[] = [
    {
        id: '1',
        index: '/baseData',
        title: '简介信息',
        children: [
            {
                id: '11',
                pid: '1',
                index: '/season1',
                title: '第一季',
            },
            {
                id: '12',
                pid: '1',
                index: '/season2',
                title: '第二季',
            },
        ]
    },
    {
        id: '2',
        title: '周边售卖',
        index: '/sales',
        children: [
            {
                id: '21',
                pid: '2',
                index: '/merchandise',
                title: '售卖统计',
            },
        ]
    },
    {
        id: '3',
        index: '/daleks',
        title: 'Daleks定制',
        children: [
            {
                id: '31',
                pid: '3',
                index: '/parameters',
                title: '特征参数',
            },
            {
                id: '32',
                pid: '3',
                index: '/LabData',
                title: '测试数据(实验室)',
            },
            {
                id: '33',
                pid: '3',
                index: '/fieldData',
                title: '测试数据(现场)',
            },
        ]
    },
    {
        id: '4',
        title: '线下活动',
        index: '/offlineEvents',
        children: [
            {
                id: '41',
                pid: '4',
                index: '/pastEvents',
                title: '往期活动查看',
            },
            {
                id: '42',
                pid: '4',
                index: '/newEvent',
                title: '组织新活动',
            },
        ]
    },
    {
        id: '5',
        title: '用户与权限',
        index: '/userAndAuth',
        children: [
            {
                id: '51',
                pid: '5',
                index: '/userManage',
                title: '用户管理',
            },
            {
                id: '52',
                pid: '5',
                index: '/authManage',
                title: '权限管理',
            },
        ]
    },
    {
        id: '6',
        title: '系统功能',
        index: '6',
    },
];
