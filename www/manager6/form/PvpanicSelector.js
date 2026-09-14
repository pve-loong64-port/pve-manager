Ext.define('PVE.form.PvpanicSelector', {
    extend: 'Proxmox.panel.InputPanel',
    alias: 'widget.pvePvpanicSelector',

    viewModel: {},

    items: [
        {
            xtype: 'proxmoxcheckbox',
            fieldLabel: gettext('Enable'),
            name: 'enabled',
            reference: 'enabled',
            uncheckedValue: 0,
        },
        {
            xtype: 'proxmoxKVComboBox',
            fieldLabel: gettext('Panic Action'),
            name: 'action',
            value: '__default__',
            comboItems: [
                ['__default__', `${Proxmox.Utils.defaultText} (${gettext('Shutdown guest')})`],
                ['none', gettext('No action')],
                ['pause', gettext('Pause guest')],
                ['shutdown', gettext('Shutdown guest')],
                ['exit-failure', gettext('Force stop guest')],
            ],
            bind: {
                disabled: '{!enabled.checked}',
            },
        },
    ],

    onGetValues: function (values) {
        let ret = {};

        if (values.enabled) {
            ret.enabled = 1;
        }
        if (values.action) {
            ret.enabled = values.enabled;
            ret.action = values.action;
        }
        if (Ext.Object.isEmpty(ret)) {
            return { delete: 'pvpanic' };
        }
        let pvpanic = PVE.Parser.printPropertyString(ret, 'enabled');
        return { pvpanic: pvpanic };
    },

    setValues: function (values) {
        if (values.pvpanic) {
            let pvpanic = PVE.Parser.parsePropertyString(values.pvpanic, 'enabled');
            this.callParent([pvpanic]);
        }
    },
});
