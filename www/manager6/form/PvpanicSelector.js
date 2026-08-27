Ext.define('PVE.form.PvpanicSelector', {
    extend: 'PVE.form.FilteredKVComboBox',
    alias: ['widget.pvePvpanicSelector'],
    comboItems: [
        ['pvpanic', 'pvpanic'],
        ['pvpanic-pci', 'pvpanic (PCI)'],
    ],

    allowBlank: false,

    allowedValuesPerCategory: PVE.qemu.Architecture.allowedPvpanic,
});
