const HealthRecord = require('../models/HealthRecord');
const Reminder = require('../models/Reminder');

exports.createRecord = async (req, res) => {
  try {
    const record = new HealthRecord({
      ...req.body,
      userId: req.user._id
    });
    await record.save();
    res.status(201).json({ message: 'Catatan berhasil ditambahkan', record });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan catatan', error: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { recordType, startDate, endDate, limit = 10 } = req.query;
    let query = { userId: req.user._id };

    if (recordType) {
      query.recordType = recordType;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await HealthRecord.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil catatan', error: error.message });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!record) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail catatan', error: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { 
        recordType: req.body.recordType,
        value: req.body.value,
        notes: req.body.notes
      },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }

    res.json({ message: 'Catatan berhasil diperbarui', record });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui catatan', error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!record) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }

    res.json({ message: 'Catatan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus catatan', error: error.message });
  }
};

exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      userId: req.user._id
    });
    await reminder.save();
    res.status(201).json({ message: 'Pengingat berhasil ditambahkan', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan pengingat', error: error.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil pengingat', error: error.message });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ message: 'Pengingat tidak ditemukan' });
    }

    res.json({ message: 'Pengingat berhasil diperbarui', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui pengingat', error: error.message });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!reminder) {
      return res.status(404).json({ message: 'Pengingat tidak ditemukan' });
    }

    res.json({ message: 'Pengingat berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus pengingat', error: error.message });
  }
}; 