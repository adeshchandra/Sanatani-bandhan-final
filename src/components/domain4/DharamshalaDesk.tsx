import React, { useState } from 'react';
import { Building, Users, Clock, CheckCircle2, Search, Plus, Calendar as CalendarIcon, MapPin, Tag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DharamshalaDesk: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings'>('rooms');

  const rooms = [
    { id: '101', type: 'Standard (Non-AC)', status: 'AVAILABLE', capacity: 2, price: 500, floor: 'Ground' },
    { id: '102', type: 'Standard (Non-AC)', status: 'OCCUPIED', capacity: 2, price: 500, floor: 'Ground', guest: 'Rahul Sharma' },
    { id: '201', type: 'Deluxe (AC)', status: 'CLEANING', capacity: 4, price: 1200, floor: '1st Floor' },
    { id: '202', type: 'Deluxe (AC)', status: 'AVAILABLE', capacity: 4, price: 1200, floor: '1st Floor' },
    { id: '301', type: 'Dormitory', status: 'AVAILABLE', capacity: 10, price: 150, floor: '2nd Floor' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'OCCUPIED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CLEANING': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-indigo-600" />
            {t('dharamshala') || 'Yatri Niwas & Dharamshala'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage pilgrim accommodations, bookings, and housekeeping.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 font-bold text-xs uppercase">Total Rooms</span>
            <Building className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-800">42</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-600 font-bold text-xs uppercase">Available</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-700">18</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-600 font-bold text-xs uppercase">Occupied</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-blue-700">20</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-600 font-bold text-xs uppercase">Needs Cleaning</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-700">4</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl inline-flex">
        <button 
          onClick={() => setActiveTab('rooms')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'rooms' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Room Status
        </button>
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'bookings' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Active Bookings
        </button>
      </div>

      {/* Room Grid */}
      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map(room => (
            <div key={room.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-800">Room {room.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4 grow">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {room.type}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  Capacity: {room.capacity} Persons
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {room.floor}
                </div>
              </div>

              {room.guest && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">Current Guest</p>
                  <p className="text-sm font-bold text-slate-800">{room.guest}</p>
                </div>
              )}

              <div className="mt-auto flex gap-2">
                {room.status === 'AVAILABLE' && (
                  <button className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2 rounded-xl text-sm transition-colors border border-indigo-200">
                    Check-in Guest
                  </button>
                )}
                {room.status === 'OCCUPIED' && (
                  <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-xl text-sm transition-colors border border-slate-200">
                    Checkout
                  </button>
                )}
                {room.status === 'CLEANING' && (
                  <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2 rounded-xl text-sm transition-colors border border-emerald-200">
                    Mark as Clean
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Booking Calendar</h3>
          <p className="text-slate-500 mt-1">Select a date range to view upcoming pilgrim arrivals.</p>
        </div>
      )}
    </div>
  );
};
