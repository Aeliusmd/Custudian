"use client";

import { useState } from 'react';
import { MOCK_DOCUMENTS, MOCK_UPLOADERS, MOCK_CATEGORIES, type DocumentRecord } from '../../../mocks/documents';
import EditMetadataModal from './modals/EditMetadataModal';
import ShareDocumentModal from './modals/ShareDocumentModal';
import VersionHistoryModal from './modals/VersionHistoryModal';
import DeleteDocumentModal from './modals/DeleteDocumentModal';

const TEAL = '#0097B2';

type ModalType = 'edit' | 'share' | 'version' | 'delete' | null;

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export default function AllDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>(MOCK_DOCUMENTS);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterVisibility, setFilterVisibility] = useState('');
  const [filterUploader, setFilterUploader] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [activeDoc, setActiveDoc] = useState<DocumentRecord | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const filtered = documents.filter((d) => {
    const q = search.toLowerCase();
    if (q && !d.name.toLowerCase().includes(q)) return false;
    if (filterCategory && d.category !== filterCategory) return false;
    if (filterVisibility && d.visibility !== filterVisibility) return false;
    if (filterUploader && d.uploadedBy !== filterUploader) return false;
    if (filterDateFrom && d.uploadDate < filterDateFrom) return false;
    if (filterDateTo && d.uploadDate > filterDateTo) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((d) => d.id)));
    }
  };

  const openModal = (type: ModalType, doc: DocumentRecord) => {
    setActiveDoc(doc);
    setModal(type);
    setActiveMenu(null);
  };

  const handleMetaSave = (doc: DocumentRecord, metadata: Record<string, string>) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, metadata, lastUpdated: new Date().toISOString().split('T')[0] } : d))
    );
    setModal(null);
    showToast('Metadata updated successfully');
  };

  const handleDelete = (ids: string[]) => {
    setDocuments((prev) => prev.filter((d) => !ids.includes(d.id)));
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    setModal(null);
    showToast(`${ids.length} document${ids.length > 1 ? 's' : ''} deleted`);
  };

  const handleBulkDownload = () => {
    showToast(`Downloading ${selected.size} files as ZIP...`);
  };

  const handleDownload = (doc: DocumentRecord) => {
    showToast(`Downloading "${doc.name}"...`);
    setActiveMenu(null);
  };

  const selectedDocs = documents.filter((d) => selected.has(d.id));

  const clearFilters = () => {
    setFilterCategory('');
    setFilterVisibility('');
    setFilterUploader('');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSearch('');
  };

  const hasFilters = filterCategory || filterVisibility || filterUploader || filterDateFrom || filterDateTo || search;

  return (
    <div className="p-6 min-h-full font-inter" onClick={() => setActiveMenu(null)}>
      {/* Toast */}
      <div className="fixed top-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl text-sm font-medium text-white flex items-center gap-2 ${
              t.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <i className={t.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-alert-line'} />
            {t.message}
          </div>
        ))}
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#1a2340]">All Documents</h1>
          <p className="text-sm text-gray-400 mt-0.5">{documents.length} total documents</p>
        </div>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <i className="ri-filter-off-line" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 py-2">
            <i className="ri-search-line text-gray-400 text-sm" />
            <input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm text-[#1a2340] bg-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} title="Clear search" aria-label="Clear search" className="text-gray-300 hover:text-gray-500 cursor-pointer">
                <i className="ri-close-line text-sm" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            title="Filter by category"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white cursor-pointer min-w-[150px]"
          >
            <option value="">All Categories</option>
            {MOCK_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Visibility filter */}
          <select
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            title="Filter by visibility"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white cursor-pointer min-w-[130px]"
          >
            <option value="">All Visibility</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {/* Uploader filter */}
          <select
            value={filterUploader}
            onChange={(e) => setFilterUploader(e.target.value)}
            title="Filter by uploader"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white cursor-pointer min-w-[160px]"
          >
            <option value="">All Uploaders</option>
            {MOCK_UPLOADERS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>

          {/* Date range */}
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white cursor-pointer"
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selected.size > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 text-white"
          style={{ background: TEAL }}
        >
          <i className="ri-checkbox-multiple-line" />
          <span className="text-sm font-semibold">{selected.size} document{selected.size > 1 ? 's' : ''} selected</span>
          <div className="flex-1" />
          <button
            onClick={() => { setModal('share'); setActiveDoc(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-share-line" /> Share
          </button>
          <button
            onClick={handleBulkDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-2-line" /> Download ZIP
          </button>
          <button
            onClick={() => { setModal('delete'); setActiveDoc(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-delete-bin-line" /> Delete
          </button>
          <button onClick={() => setSelected(new Set())} title="Clear selection" aria-label="Clear selection" className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer">
            <i className="ri-close-line text-sm" />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded cursor-pointer accent-[#0097B2]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Document Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Uploaded By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Visibility</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Upload Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Last Updated</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400">
                    <i className="ri-file-search-line text-3xl block mb-2" />
                    <p className="text-sm">No documents match your filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-[#0097B2]/[0.03] transition-all cursor-default group relative"
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={selected.has(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded cursor-pointer accent-[#0097B2]"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TEAL}15` }}>
                          <i className="ri-file-pdf-2-line text-sm" style={{ color: TEAL }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-[#1a2340] truncate max-w-[220px]">{doc.name}</div>
                          <div className="text-xs text-gray-400">{doc.fileSize} · {doc.fileType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: TEAL }}>
                          {doc.uploadedBy.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                        </div>
                        <span className="text-sm text-gray-600 whitespace-nowrap">{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          doc.visibility === 'Public'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <i className={`mr-1 ${doc.visibility === 'Public' ? 'ri-global-line' : 'ri-lock-line'}`} />
                        {doc.visibility}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{doc.uploadDate}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{doc.lastUpdated}</td>
                    <td className="px-4 py-3.5">
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setActiveMenu(activeMenu === doc.id ? null : doc.id)}
                          title="More actions"
                          aria-label="More actions"
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                            activeMenu === doc.id
                              ? 'bg-[#0097B2]/10 text-[#0097B2]'
                              : 'text-gray-400 hover:bg-gray-100 hover:text-[#1a2340]'
                          }`}
                        >
                          <i className="ri-more-2-fill text-base" />
                        </button>
                        {activeMenu === doc.id && (
                          <div className="absolute right-0 top-10 w-52 bg-white border border-gray-200 rounded-2xl overflow-hidden z-40 py-1.5">
                            <button
                              onClick={() => openModal('edit', doc)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0097B2]/5 hover:text-[#0097B2] transition-colors cursor-pointer group/item"
                            >
                              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 group-hover/item:bg-[#0097B2]/10 transition-colors flex-shrink-0">
                                <i className="ri-edit-2-line text-xs text-gray-500 group-hover/item:text-[#0097B2]" />
                              </span>
                              <span className="font-medium">Edit Metadata</span>
                            </button>
                            <button
                              onClick={() => openModal('share', doc)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0097B2]/5 hover:text-[#0097B2] transition-colors cursor-pointer group/item"
                            >
                              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 group-hover/item:bg-[#0097B2]/10 transition-colors flex-shrink-0">
                                <i className="ri-share-forward-line text-xs text-gray-500 group-hover/item:text-[#0097B2]" />
                              </span>
                              <span className="font-medium">Share</span>
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0097B2]/5 hover:text-[#0097B2] transition-colors cursor-pointer group/item"
                            >
                              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 group-hover/item:bg-[#0097B2]/10 transition-colors flex-shrink-0">
                                <i className="ri-download-2-line text-xs text-gray-500 group-hover/item:text-[#0097B2]" />
                              </span>
                              <span className="font-medium">Download PDF</span>
                            </button>
                            <button
                              onClick={() => openModal('version', doc)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0097B2]/5 hover:text-[#0097B2] transition-colors cursor-pointer group/item"
                            >
                              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 group-hover/item:bg-[#0097B2]/10 transition-colors flex-shrink-0">
                                <i className="ri-history-line text-xs text-gray-500 group-hover/item:text-[#0097B2]" />
                              </span>
                              <span className="font-medium">Version History</span>
                            </button>
                            <div className="mx-4 my-1 border-t border-gray-100" />
                            <button
                              onClick={() => openModal('delete', doc)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer group/item"
                            >
                              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 group-hover/item:bg-red-100 transition-colors flex-shrink-0">
                                <i className="ri-delete-bin-line text-xs text-red-400" />
                              </span>
                              <span className="font-medium">Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {filtered.length} of {documents.length} documents
            </p>
            <p className="text-xs text-gray-400">
              {selected.size > 0 ? `${selected.size} selected` : 'Click checkbox to select'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === 'edit' && activeDoc && (
        <EditMetadataModal doc={activeDoc} onClose={() => setModal(null)} onSave={handleMetaSave} />
      )}
      {modal === 'share' && (
        <ShareDocumentModal
          docs={activeDoc ? [activeDoc] : selectedDocs}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'version' && activeDoc && (
        <VersionHistoryModal doc={activeDoc} onClose={() => setModal(null)} />
      )}
      {modal === 'delete' && (
        <DeleteDocumentModal
          docs={activeDoc ? [activeDoc] : selectedDocs}
          onClose={() => setModal(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
