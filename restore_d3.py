import re

filepath = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# Restore Anushthan CRM sync
crm_sync = """
      // Unify with Purohit Anushthan CRM directly
      const anuId = `ANU-${Math.floor(1000 + Math.random() * 9000)}`;
      updates[`communities/${session.communityId}/purohit_anushthans/${anuId}`] = {
        id: anuId,
        yajamanName: bookingForm.yajamanaName,
        yajamanPhone: '',
        pujaName: selectedGig.title,
        date: bookingForm.ceremonyDate,
        time: bookingForm.ceremonyTime,
        tithi: '',
        muhurat: '',
        status: 'BOOKED',
        dakshinaEst: selectedGig.dakshinaFee,
        createdAt: timestamp,
        purohitName: selectedGig.purohitName
      };

      // Escrow Treasury Ledger Link - Holding Dakshina"""

text = text.replace("// Escrow Treasury Ledger Link - Holding Dakshina", crm_sync)

with open(filepath, 'w') as f:
    f.write(text)
