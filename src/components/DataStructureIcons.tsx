import React from "react";

interface IconProps {
  className?: string;
}

export const ArrayPointersIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Array Cells */}
    <rect x="5" y="10" width="16" height="18" rx="3" className="fill-cyan-500/20 stroke-cyan-400" strokeWidth="1.5" />
    <rect x="23" y="10" width="16" height="18" rx="3" className="fill-cyan-500/10 stroke-cyan-500/40" strokeWidth="1.5" />
    <rect x="41" y="10" width="16" height="18" rx="3" className="fill-cyan-500/10 stroke-cyan-500/40" strokeWidth="1.5" />
    <rect x="59" y="10" width="16" height="18" rx="3" className="fill-cyan-500/20 stroke-cyan-400" strokeWidth="1.5" />
    {/* Pointers L & R */}
    <path d="M13 38V30M13 30L10 33M13 30L16 33" stroke="#22d3ee" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M67 38V30M67 30L64 33M67 30L70 33" stroke="#22d3ee" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <text x="13" y="47" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold" fontFamily="monospace">L</text>
    <text x="67" y="47" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold" fontFamily="monospace">R</text>
  </svg>
);

export const HashPartitionIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Hash Table Bucket Array */}
    <rect x="6" y="8" width="22" height="10" rx="2" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1.5" />
    <rect x="6" y="20" width="22" height="10" rx="2" className="fill-emerald-500/10 stroke-emerald-500/40" strokeWidth="1.5" />
    <rect x="6" y="32" width="22" height="10" rx="2" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1.5" />
    {/* Pointer to value */}
    <path d="M28 13H42M42 13L39 10M42 13L39 16" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="44" y="8" width="30" height="10" rx="2" className="fill-emerald-400/30 stroke-emerald-300" strokeWidth="1.2" />
    <text x="59" y="15.5" textAnchor="middle" fill="#a7f3d0" fontSize="6" fontWeight="bold" fontFamily="monospace">O(1)</text>
    {/* Binary Search Split Indicator */}
    <path d="M52 24L65 32M65 32L78 40" stroke="#34d399" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="65" cy="32" r="3" fill="#34d399" />
  </svg>
);

export const LinkedListStackIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Node 1 */}
    <rect x="4" y="8" width="22" height="14" rx="3" className="fill-fuchsia-500/20 stroke-fuchsia-400" strokeWidth="1.5" />
    <line x1="18" y1="8" x2="18" y2="22" stroke="#e879f9" strokeWidth="1.2" />
    <circle cx="21" cy="15" r="1.5" fill="#f0abfc" />
    {/* Arrow */}
    <path d="M26 15H36M36 15L33 12M36 15L33 18" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
    {/* Node 2 */}
    <rect x="38" y="8" width="22" height="14" rx="3" className="fill-fuchsia-500/30 stroke-fuchsia-300" strokeWidth="1.5" />
    <line x1="52" y1="8" x2="52" y2="22" stroke="#e879f9" strokeWidth="1.2" />
    {/* Stack Bottom */}
    <rect x="18" y="32" width="44" height="6" rx="2" className="fill-fuchsia-500/40 stroke-fuchsia-400" strokeWidth="1.2" />
    <rect x="24" y="27" width="32" height="4" rx="1.5" className="fill-fuchsia-500/20 stroke-fuchsia-400/60" strokeWidth="1" />
    <text x="40" y="46" textAnchor="middle" fill="#f5d0fe" fontSize="7" fontWeight="bold" fontFamily="monospace">LIFO</text>
  </svg>
);

export const TreeHeapIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Edges */}
    <line x1="40" y1="12" x2="22" y2="26" stroke="#a78bfa" strokeWidth="1.5" />
    <line x1="40" y1="12" x2="58" y2="26" stroke="#a78bfa" strokeWidth="1.5" />
    <line x1="22" y1="26" x2="14" y2="40" stroke="#8b5cf6" strokeWidth="1.2" />
    <line x1="22" y1="26" x2="30" y2="40" stroke="#8b5cf6" strokeWidth="1.2" />
    <line x1="58" y1="26" x2="66" y2="40" stroke="#8b5cf6" strokeWidth="1.2" />
    {/* Root Node */}
    <circle cx="40" cy="12" r="6" className="fill-violet-500 stroke-violet-300" strokeWidth="1.5" />
    {/* Child Nodes */}
    <circle cx="22" cy="26" r="5" className="fill-violet-600 stroke-violet-400" strokeWidth="1.5" />
    <circle cx="58" cy="26" r="5" className="fill-violet-600 stroke-violet-400" strokeWidth="1.5" />
    {/* Leaves */}
    <circle cx="14" cy="40" r="3.5" className="fill-violet-700 stroke-violet-500" strokeWidth="1" />
    <circle cx="30" cy="40" r="3.5" className="fill-violet-700 stroke-violet-500" strokeWidth="1" />
    <circle cx="66" cy="40" r="3.5" className="fill-violet-700 stroke-violet-500" strokeWidth="1" />
  </svg>
);

export const GraphDagIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Directed Edges */}
    <path d="M16 25L38 12M38 12L32 12M38 12L35 17" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 25L38 38M38 38L32 38M38 38L35 33" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M42 12L64 25M64 25L58 23M64 25L60 28" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M42 38L64 25M64 25L60 22M64 25L58 27" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
    {/* Nodes */}
    <circle cx="14" cy="25" r="5.5" className="fill-rose-500 stroke-rose-300" strokeWidth="1.5" />
    <circle cx="40" cy="12" r="5" className="fill-rose-600 stroke-rose-400" strokeWidth="1.5" />
    <circle cx="40" cy="38" r="5" className="fill-rose-600 stroke-rose-400" strokeWidth="1.5" />
    <circle cx="66" cy="25" r="5.5" className="fill-rose-500 stroke-rose-300" strokeWidth="1.5" />
    <text x="66" y="27.5" textAnchor="middle" fill="#ffe4e6" fontSize="6" fontWeight="bold" fontFamily="monospace">DAG</text>
  </svg>
);

export const DpGridIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* DP Matrix 3x4 */}
    <rect x="12" y="8" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />
    <rect x="26" y="8" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />
    <rect x="40" y="8" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />
    <rect x="54" y="8" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />

    <rect x="12" y="20" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />
    <rect x="26" y="20" width="12" height="10" rx="2" className="fill-orange-500/40 stroke-orange-400" strokeWidth="1.2" />
    <rect x="40" y="20" width="12" height="10" rx="2" className="fill-orange-500/40 stroke-orange-400" strokeWidth="1.2" />
    <rect x="54" y="20" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />

    <rect x="12" y="32" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />
    <rect x="26" y="32" width="12" height="10" rx="2" className="fill-orange-500/20 stroke-orange-500/40" strokeWidth="1" />
    <rect x="40" y="32" width="12" height="10" rx="2" className="fill-orange-500/40 stroke-orange-400" strokeWidth="1.2" />
    <rect x="54" y="32" width="12" height="10" rx="2" className="fill-orange-500/60 stroke-orange-300 ring-1 ring-orange-400" strokeWidth="1.5" />

    {/* Transition arrows into bottom-right cell */}
    <path d="M46 32V25M46 32L44 28M46 32L48 28" stroke="#fdba74" strokeWidth="1.2" strokeLinecap="round" />
    <text x="60" y="39" textAnchor="middle" fill="#ffedd5" fontSize="7" fontWeight="bold" fontFamily="monospace">dp</text>
  </svg>
);

export const SegmentTreeIcon: React.FC<IconProps> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 80 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Range Segment Tree Hierarchy */}
    <rect x="26" y="6" width="28" height="8" rx="2" className="fill-indigo-500/40 stroke-indigo-300" strokeWidth="1.2" />
    <text x="40" y="12.5" textAnchor="middle" fill="#e0e7ff" fontSize="5.5" fontWeight="bold" fontFamily="monospace">[0..7]</text>

    <line x1="33" y1="14" x2="22" y2="20" stroke="#818cf8" strokeWidth="1.2" />
    <line x1="47" y1="14" x2="58" y2="20" stroke="#818cf8" strokeWidth="1.2" />

    <rect x="10" y="20" width="24" height="8" rx="2" className="fill-indigo-500/30 stroke-indigo-400" strokeWidth="1" />
    <text x="22" y="26.5" textAnchor="middle" fill="#c7d2fe" fontSize="5" fontWeight="bold" fontFamily="monospace">[0..3]</text>

    <rect x="46" y="20" width="24" height="8" rx="2" className="fill-indigo-500/30 stroke-indigo-400" strokeWidth="1" />
    <text x="58" y="26.5" textAnchor="middle" fill="#c7d2fe" fontSize="5" fontWeight="bold" fontFamily="monospace">[4..7]</text>

    {/* Sweep Line indicator at bottom */}
    <line x1="8" y1="40" x2="72" y2="40" stroke="#6366f1" strokeWidth="1.5" />
    <line x1="42" y1="34" x2="42" y2="46" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
    <text x="42" y="32" textAnchor="middle" fill="#a5b4fc" fontSize="5.5" fontWeight="bold" fontFamily="monospace">sweep</text>
  </svg>
);
