import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { adminApi, getAdminUser } from "../services/adminApi";
import {
  Users,
  FileText,
  Download,
  TrendingUp,
  Star,
  RefreshCw,
  ArrowRight,
  Calendar,
  Check,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const adminUser = getAdminUser() || { name: "Admin" };
  const [period, setPeriod] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async (selectedPeriod = period, sDate = customStartDate, eDate = customEndDate) => {
    try {
      setError("");
      const data = await adminApi.getDashboardStats(selectedPeriod, sDate, eDate);
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (period !== "custom") {
      fetchStats(period);
    }
  }, [period]);

  // Close custom date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyCustomDate = (e) => {
    e.preventDefault();
    if (!customStartDate) {
      alert("Please select a start date.");
      return;
    }
    setPeriod("custom");
    setShowDatePicker(false);
    setLoading(true);
    fetchStats("custom", customStartDate, customEndDate);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats(period, customStartDate, customEndDate);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header Card with Filter Pills & Custom Date Picker */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {todayFormatted}
              </span>
              <span className="text-[11px] font-bold text-[rgb(250,12,64)] bg-[rgba(250,12,64,0.08)] px-2.5 py-0.5 rounded-full border border-[rgba(250,12,64,0.2)]">
                {stats?.period_label || "All Time Aggregated"}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {greeting}, {adminUser.name || "Admin"} 👋
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Real-time platform metrics, downloads activity, and database overview.
            </p>
          </div>

          {/* Date Range Filter Bar */}
          <div className="flex items-center gap-2 self-start md:self-auto relative">
            <div className="inline-flex bg-gray-100 p-1 rounded-full border border-gray-200 shadow-2xs">
              {[
                { id: "today", label: "Today" },
                { id: "7d", label: "7D" },
                { id: "30d", label: "30D" },
                { id: "all", label: "All" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    setPeriod(pill.id);
                    setShowDatePicker(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    period === pill.id
                      ? "bg-[rgb(250,12,64)] text-white shadow-xs"
                      : "text-gray-600 hover:text-[rgb(250,12,64)]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}

              {/* Custom Date Range Pill */}
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  period === "custom"
                    ? "bg-[rgb(250,12,64)] text-white shadow-xs"
                    : "text-gray-600 hover:text-[rgb(250,12,64)]"
                }`}
              >
                <span>Custom</span>
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh Data"
              className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-[rgb(250,12,64)] hover:border-red-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[rgb(250,12,64)]" : ""}`} />
            </button>

            {/* Custom Date Range Floating Dropdown */}
            {showDatePicker && (
              <div
                ref={datePickerRef}
                className="absolute right-0 top-12 z-50 w-72 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl animate-scale-up"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-900">Select Date Range</span>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleApplyCustomDate} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[rgb(250,12,64)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[rgb(250,12,64)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[rgb(250,12,64)] hover:bg-[rgb(225,10,57)] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Apply Filter
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* 5 Main Stat Cards Grid (Responsive 1 -> 2 -> 3 -> 5 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-visible w-full">
          {/* Card 1: Users (Blue) */}
          <Link
            to="/admin/users"
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group block min-w-0"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md shrink-0">
                Users
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 truncate">
              {period === "today" ? "New Users Today" : period === "7d" ? "Signups (7D)" : period === "30d" ? "Signups (30D)" : "Total Users"}
            </div>
            <div className="text-2xl font-black text-gray-900 mt-1 tracking-tight truncate">
              {loading ? <span className="inline-block w-14 h-7 bg-gray-200 rounded animate-pulse" /> : stats?.total_users ?? 0}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 font-medium truncate">
              Registered accounts
            </div>
          </Link>

          {/* Card 2: Resumes Created (Crimson) */}
          <Link
            to="/admin/resumes"
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group block min-w-0"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[rgb(250,12,64)] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[rgb(250,12,64)] bg-red-50 px-2 py-0.5 rounded-md shrink-0">
                Resumes
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 truncate">
              {period === "today" ? "Resumes Today" : period === "7d" ? "Created (7D)" : period === "30d" ? "Created (30D)" : "Total Resumes"}
            </div>
            <div className="text-2xl font-black text-gray-900 mt-1 tracking-tight truncate">
              {loading ? <span className="inline-block w-14 h-7 bg-gray-200 rounded animate-pulse" /> : stats?.total_resumes ?? 0}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 font-medium truncate">
              Created resumes
            </div>
          </Link>

          {/* Card 3: Total Downloads (Purple) */}
          <Link
            to="/admin/downloads"
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group block min-w-0"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md shrink-0">
                Downloads
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 truncate">Resume Downloads</div>
            <div className="text-2xl font-black text-gray-900 mt-1 tracking-tight truncate">
              {loading ? <span className="inline-block w-14 h-7 bg-gray-200 rounded animate-pulse" /> : stats?.total_downloads ?? 0}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 font-medium truncate">
              PDF/DOCX exports
            </div>
          </Link>

          {/* Card 4: Resumes This Month (Emerald Green) */}
          <Link
            to="/admin/resumes"
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group block min-w-0"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                This Month
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 truncate">Resumes This Month</div>
            <div className="text-2xl font-black text-gray-900 mt-1 tracking-tight truncate">
              {loading ? <span className="inline-block w-14 h-7 bg-gray-200 rounded animate-pulse" /> : stats?.resumes_this_month ?? 0}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 font-medium truncate">
              Monthly creation pace
            </div>
          </Link>

          {/* Card 5: Feedback Received (Amber) */}
          <Link
            to="/admin/feedback"
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group block min-w-0"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                Feedback
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 truncate">Feedback Reviews</div>
            <div className="text-2xl font-black text-gray-900 mt-1 tracking-tight truncate">
              {loading ? <span className="inline-block w-14 h-7 bg-gray-200 rounded animate-pulse" /> : stats?.total_feedback ?? 0}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 font-medium truncate">
              User submissions
            </div>
          </Link>
        </div>

        {/* Quick Stats Strip */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="px-3 pt-2 md:pt-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Users</span>
            <div className="text-lg font-extrabold text-[rgb(250,12,64)] mt-0.5">
              {loading ? "..." : stats?.active_users ?? 0}
            </div>
          </div>
          <div className="px-3 pt-2 md:pt-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Avg Feedback Rating</span>
            <div className="text-lg font-extrabold text-amber-500 mt-0.5 flex items-center gap-1">
              {loading ? "..." : `${stats?.avg_rating ?? 5.0} ★`}
            </div>
          </div>
          <div className="px-3 pt-2 md:pt-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">New Users Today</span>
            <div className="text-lg font-extrabold text-gray-900 mt-0.5">
              {loading ? "..." : stats?.new_users_today ?? 0}
            </div>
          </div>
          <div className="px-3 pt-2 md:pt-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Downloads Today</span>
            <div className="text-lg font-extrabold text-purple-600 mt-0.5">
              {loading ? "..." : stats?.downloads_today ?? 0}
            </div>
          </div>
        </div>

        {/* 3 Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Signups Trend */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <div className="mb-3">
              <h3 className="text-sm font-extrabold text-gray-900">User Signups Trend</h3>
              <p className="text-[11px] text-gray-400 font-medium">New registrations for period</p>
            </div>
            <div className="h-60 w-full">
              {loading ? (
                <div className="h-full w-full bg-gray-50 rounded-xl flex items-center justify-center text-xs text-gray-400 animate-pulse">
                  Loading chart data...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.charts || []}>
                    <defs>
                      <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderRadius: "10px",
                        border: "none",
                        color: "#FFFFFF",
                        fontSize: "11px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      name="Signups"
                      stroke="#3B82F6"
                      strokeWidth={2.2}
                      fillOpacity={1}
                      fill="url(#userGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Chart 2: Resumes Created Trend */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <div className="mb-3">
              <h3 className="text-sm font-extrabold text-gray-900">Resumes Created Trend</h3>
              <p className="text-[11px] text-gray-400 font-medium">Creation pace over time</p>
            </div>
            <div className="h-60 w-full">
              {loading ? (
                <div className="h-full w-full bg-gray-50 rounded-xl flex items-center justify-center text-xs text-gray-400 animate-pulse">
                  Loading chart data...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.charts || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderRadius: "10px",
                        border: "none",
                        color: "#FFFFFF",
                        fontSize: "11px",
                      }}
                    />
                    <Bar
                      dataKey="resumes"
                      name="Resumes"
                      fill="rgb(250, 12, 64)"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Chart 3: Resume Downloads Trend */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <div className="mb-3">
              <h3 className="text-sm font-extrabold text-gray-900">Downloads Trend</h3>
              <p className="text-[11px] text-gray-400 font-medium">PDF/DOCX exports volume</p>
            </div>
            <div className="h-60 w-full">
              {loading ? (
                <div className="h-full w-full bg-gray-50 rounded-xl flex items-center justify-center text-xs text-gray-400 animate-pulse">
                  Loading chart data...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.charts || []}>
                    <defs>
                      <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderRadius: "10px",
                        border: "none",
                        color: "#FFFFFF",
                        fontSize: "11px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="downloads"
                      name="Downloads"
                      stroke="#8B5CF6"
                      strokeWidth={2.2}
                      fillOpacity={1}
                      fill="url(#dlGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Bottom 2 Tables: Recent Users & Recent Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users Table */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-extrabold text-gray-900">Recent Users</h3>
              <Link to="/admin/users" className="text-xs font-bold text-[rgb(250,12,64)] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 uppercase font-bold text-[10px] border-b border-gray-100">
                    <th className="pb-2.5">User</th>
                    <th className="pb-2.5">Email</th>
                    <th className="pb-2.5 text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats?.recent_users?.length ? (
                    stats.recent_users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-2.5 font-bold text-gray-900">{u.name}</td>
                        <td className="py-2.5 text-gray-500">{u.email}</td>
                        <td className="py-2.5 text-gray-400 text-right">{u.joined}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-gray-400">
                        No registered users yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Feedback Table */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-extrabold text-gray-900">Recent Feedback</h3>
              <Link to="/admin/feedback" className="text-xs font-bold text-[rgb(250,12,64)] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 uppercase font-bold text-[10px] border-b border-gray-100">
                    <th className="pb-2.5">User</th>
                    <th className="pb-2.5">Rating</th>
                    <th className="pb-2.5">Comment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats?.recent_feedback?.length ? (
                    stats.recent_feedback.map((fb) => (
                      <tr key={fb.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-2.5 font-bold text-gray-900 truncate max-w-[120px]">{fb.user_email}</td>
                        <td className="py-2.5 text-amber-500 font-extrabold">{fb.rating ? `${fb.rating} ★` : "-"}</td>
                        <td className="py-2.5 text-gray-500 truncate max-w-[180px]">{fb.message || "No comment"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-gray-400">
                        No feedback submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
