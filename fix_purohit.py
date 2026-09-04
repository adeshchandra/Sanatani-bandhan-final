import re

filepath = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

missing_html = """      </div>

      <div className="mt-8">
        {activeTab === 'GIGS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGigs.length > 0 ? (
              filteredGigs.map(gig => (
                <div key={gig.gigId} onClick={() => setSelectedGig(gig)} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1">
                  <div className="h-48 relative overflow-hidden bg-gray-100">
                    <img src={gig.imageUrl || 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80'} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  </div>
"""

# We want to replace everything from `      </div>\n\n                  <div className="p-6 pt-8 flex-1 flex flex-col">`
# with the missing html + the inner div

content = content.replace('      </div>\n\n                  <div className="p-6 pt-8 flex-1 flex flex-col">', missing_html + '                  <div className="p-6 pt-8 flex-1 flex flex-col">')

with open(filepath, 'w') as f:
    f.write(content)
