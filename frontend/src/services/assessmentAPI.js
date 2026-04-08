import api from './api';

export const assessmentAPI = {
    // Create a new assessment
    createAssessment: async (data) => {
        const response = await api.post('/assessments', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // Get all assessments (Admin)
    getAssessments: async () => {
        const response = await api.get('/assessments');
        return response.data;
    },

    // Get single assessment by ID
    getAssessment: async (id) => {
        const response = await api.get(`/assessments/${id}`);
        return response.data;
    },

    // Update assessment
    updateAssessment: async (id, data) => {
        const response = await api.put(`/assessments/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // Delete assessment
    deleteAssessment: async (id) => {
        const response = await api.delete(`/assessments/${id}`);
        return response.data;
    },

    // Get institute's assessments
    getInstituteAssessments: async () => {
        const response = await api.get('/assessments/institute');
        return response.data;
    },

    // Publish assessment
    publishAssessment: async (id) => {
        const response = await api.patch(`/assessments/${id}/publish`);
        return response.data;
    },

    // Update assessment status
    updateStatus: async (id, data) => {
        const response = await api.patch(`/assessments/${id}/status`, data);
        return response.data;
    },

    // Download assessment
    downloadAssessment: async (id) => {
        const response = await api.get(`/assessments/${id}/download`);
        return response;
    }
};
