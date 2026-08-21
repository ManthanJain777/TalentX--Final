import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsCharts = ({ data }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  const COLORS = {
    gold: '#8B6B23',
    navy: '#142544',
    verified: '#1D8A5F',
    pending: '#B9821E',
    risk: '#C0424D',
    bg: 'transparent'
  };

  const PIE_COLORS = [COLORS.verified, COLORS.pending, COLORS.risk];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Chart 1: User Growth */}
      <motion.div variants={item} className="glass-panel p-6 h-80">
        <h3 className="font-display font-semibold text-lg text-ink mb-1">Platform Growth</h3>
        <p className="text-xs text-ink-soft font-mono mb-4">Total verified users (last 6 months)</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.userGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#142544" opacity={0.05} />
            <XAxis dataKey="month" stroke="#142544" opacity={0.5} fontSize={10} tickMargin={10} />
            <YAxis stroke="#142544" opacity={0.5} fontSize={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid rgba(20, 37, 68, 0.1)', fontSize: '12px' }} 
            />
            <Line type="monotone" dataKey="users" stroke={COLORS.gold} strokeWidth={3} dot={{ r: 4, fill: COLORS.gold }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Chart 2: Project Volume */}
      <motion.div variants={item} className="glass-panel p-6 h-80">
        <h3 className="font-display font-semibold text-lg text-ink mb-1">Project Volume</h3>
        <p className="text-xs text-ink-soft font-mono mb-4">Projects created vs completed</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.projects} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#142544" opacity={0.05} vertical={false} />
            <XAxis dataKey="month" stroke="#142544" opacity={0.5} fontSize={10} tickMargin={10} />
            <YAxis stroke="#142544" opacity={0.5} fontSize={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid rgba(20, 37, 68, 0.1)', fontSize: '12px' }} 
            />
            <Bar dataKey="created" fill={COLORS.navy} radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill={COLORS.gold} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Chart 3: Revenue */}
      <motion.div variants={item} className="glass-panel p-6 h-80">
        <h3 className="font-display font-semibold text-lg text-ink mb-1">Escrow Volume</h3>
        <p className="text-xs text-ink-soft font-mono mb-4">Total funds locked in smart contracts</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.revenue} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.gold} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={COLORS.gold} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#142544" opacity={0.05} />
            <XAxis dataKey="month" stroke="#142544" opacity={0.5} fontSize={10} tickMargin={10} />
            <YAxis stroke="#142544" opacity={0.5} fontSize={10} tickFormatter={(val) => `₹${val/1000}k`} />
            <Tooltip 
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Escrow Volume']}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid rgba(20, 37, 68, 0.1)', fontSize: '12px' }} 
            />
            <Area type="monotone" dataKey="revenue" stroke={COLORS.gold} fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Chart 4: Match Efficiency */}
      <motion.div variants={item} className="glass-panel p-6 h-80 flex flex-col">
        <div>
          <h3 className="font-display font-semibold text-lg text-ink mb-1">Match Outcomes</h3>
          <p className="text-xs text-ink-soft font-mono mb-4">Algorithm suggestion conversions</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.matchEfficiency}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.matchEfficiency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid rgba(20, 37, 68, 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                itemStyle={{ color: '#142544' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 pt-4 border-t border-ink/5">
          {data.matchEfficiency.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />
              <span className="text-xs font-medium text-ink-soft">{entry.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default AnalyticsCharts;
