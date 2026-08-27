Ext.define('PVE.qemu.PvpanicEdit', {
    extend: 'Proxmox.window.Edit',

    subject: gettext('Panic Monitor (pvpanic)'),

    onlineHelp: 'qm_pvpanic',

    items: [
        {
            xtype: 'pvePvpanicSelector',
            name: 'pvpanic0',
            fieldLabel: gettext('Type'),
        },
    ],

    initComponent: function () {
        var me = this;

        me.nodename = me.pveSelNode?.data.node;

        if (!me.nodename) {
            throw 'no nodename given';
        }

        me.callParent();

        me.load({
            success: function ({ result }) {
                let values = result.data;
                let arch = PVE.qemu.Architecture.getGuestArchitecture(values.arch, me.nodename);
                let pvpanic0 = values.pvpanic0;
                if (pvpanic0) {
                    me.down('pvePvpanicSelector').setValue(pvpanic0);
                }
                me.down('pvePvpanicSelector').setCategory(arch);
            },
        });
    },
});
