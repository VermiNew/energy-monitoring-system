import { useState, useEffect } from 'react'
import { ArrowLeft, HelpCircle, Battery, Thermometer } from 'lucide-react'
import type { SystemDetailViewProps } from '../types'
import { setupTimeInterval } from '../utils/time'
import { getBatteryColor } from '../utils/colors'
import { calculateBatteryDashOffset } from '../utils/calculations'

export function SystemDetailView({
  onBack,
  batteryLevel,
  availableDays,
  availableHours,
  showDemo,
  setBatteryLevel,
  setAvailableDays,
  setAvailableHours,
  setInputPower,
  setOutputPower,
  inputPower,
  outputPower,
  storageUnits = []
}: SystemDetailViewProps) {
  const [time, setTime] = useState<string>('')
  const batteryColorValue = getBatteryColor(batteryLevel)
  const dashOffset = calculateBatteryDashOffset(batteryLevel)

  useEffect(() => {
    const cleanup = setupTimeInterval(setTime)
    return cleanup
  }, [])

  return (
    <div className="min-h-screen p-5 flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '"Orbitron", -apple-system, sans-serif'
    }}>
      <div className="w-full max-w-7xl rounded-3xl p-8 shadow-2xl" style={{
        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div className="flex items-center justify-between mb-8 pb-5" style={{
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#60a5fa'
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-wide m-0" style={{fontFamily: '"Orbitron"'}}>System</h1>
          </div>
          <div className="px-4 py-2 rounded-lg text-sm font-semibold" style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#60a5fa',
            fontFamily: '"Orbitron", -apple-system, sans-serif'
          }}>
            {time}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-8">
              <p className="text-sm text-slate-400 font-medium mb-4">Available Time</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div className="text-center">
                   <div className="text-5xl font-bold text-green-400 leading-none number-display" style={{fontFamily: '"Orbitron"'}}>
                      {availableDays}
                    </div>
                    <div className="text-xs text-slate-400 font-semibold mt-3 uppercase tracking-wide">Days</div>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div className="text-center">
                   <div className="text-5xl font-bold text-green-400 leading-none number-display" style={{fontFamily: '"Orbitron"'}}>
                      {availableHours}
                    </div>
                    <div className="text-xs text-slate-400 font-semibold mt-3 uppercase tracking-wide">Hrs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center py-8">
              <div className="relative" style={{width: '240px', height: '120px'}}>
                <svg width="240" height="120" viewBox="0 0 240 120">
                  <path
                    d="M 20 120 A 100 100 0 0 1 220 120"
                    fill="none"
                    stroke="rgba(30, 58, 95, 0.5)"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 120 A 100 100 0 0 1 220 120"
                    fill="none"
                    stroke={batteryColorValue}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${dashOffset} 314`}
                    style={{transition: 'stroke-dasharray 0.5s ease, stroke 0.4s ease'}}
                  />
                </svg>
                <div className="absolute inset-0 flex items-end justify-center">
                   <span className="text-5xl font-bold text-white number-display" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>
                      {batteryLevel}<span className="text-xl">%</span>
                    </span>
                 </div>
                <div className="absolute" style={{left: '-20px', bottom: '0px'}}>
                  <span className="text-xs text-slate-400 font-semibold">0%</span>
                </div>
                <div className="absolute" style={{right: '-35px', bottom: '0px'}}>
                  <span className="text-xs text-slate-400 font-semibold">100%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
             <span className="text-sm text-slate-400 font-medium">Battery Heating</span>
             <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{
               background: 'rgba(59, 130, 246, 0.2)',
               border: '1px solid rgba(59, 130, 246, 0.4)'
             }}>
               <HelpCircle size={14} className="text-blue-400" />
             </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-slate-400 font-semibold mb-4">Storage and Conversion</h3>
            <div className="space-y-3">
              {storageUnits.length > 0 ? (
                storageUnits.map((unit) => (
                  <div key={unit.id} className="rounded-xl p-4" style={{
                    background: 'linear-gradient(145deg, #1e3a5f 0%, #0f2744 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded flex items-center justify-center" style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            border: '1px solid rgba(59, 130, 246, 0.4)'
                          }}>
                            <span className="text-xs text-blue-400 font-bold">{unit.id}</span>
                          </div>
                          <span className="text-lg font-bold text-white">{unit.capacity}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Thermometer size={14} className="text-blue-400" />
                            <span className="text-sm text-slate-300 font-medium">{unit.temperature}</span>
                          </div>
                          <div className="text-xs text-slate-400">{unit.voltage}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                          background: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid rgba(16, 185, 129, 0.4)'
                        }}>
                          <Battery size={24} className="text-green-400" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white test-font-numbers number-display">{unit.level}</div>
                          <div className="text-xs text-slate-400">{unit.current}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl p-4" style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px dashed rgba(59, 130, 246, 0.3)'
                }}>
                  <p className="text-center text-slate-400 text-sm m-0">Awaiting server data...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {showDemo && (
          <div className="mt-8 p-5 rounded-xl" style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <h3 className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-4 m-0">Demo Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-2 font-semibold">
                  Battery Level: {batteryLevel}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={batteryLevel}
                  onChange={(e) => {
                    const level = parseInt(e.target.value)
                    setBatteryLevel(level)
                    if (level === 0) {
                      setAvailableDays(0)
                      setAvailableHours(0)
                    } else {
                      setAvailableDays(99)
                      setAvailableHours(23)
                    }
                  }}
                  className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${batteryLevel}%, #1e293b ${batteryLevel}%, #1e293b 100%)`
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-2 font-semibold">
                  Input Power: {inputPower}W
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="1"
                  value={inputPower}
                  onChange={(e) => setInputPower(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${inputPower/10}%, #1e293b ${inputPower/10}%, #1e293b 100%)`
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-2 font-semibold">
                  Output Power: {outputPower}W
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="1"
                  value={outputPower}
                  onChange={(e) => setOutputPower(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${outputPower/10}%, #1e293b ${outputPower/10}%, #1e293b 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <style>{`
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
          }
          
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
            border: 2px solid #3b82f6;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
            border: 2px solid #3b82f6;
          }
        `}</style>
      </div>
    </div>
  )
}
