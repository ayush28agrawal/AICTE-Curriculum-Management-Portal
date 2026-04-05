import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentAPI } from '../../services/assessmentAPI';
import { curriculumAPI } from '../../services/api';
import Button from '../Button/Button';
import { FormGroup, Input, Select, TextArea } from '../Form/Form';
import Card from '../Card/Card';
import './Assessment.css';

const AssessmentForm = ({ initialData, isEdit = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [curriculums, setCurriculums] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        courseId: '',
        type: 'Quiz',
        passingMarks: 0,
        totalMarks: 0,
        duration: 60,
        file: null
    });

    useEffect(() => {
        fetchCurriculums();
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const fetchCurriculums = async () => {
        try {
            const response = await curriculumAPI.getAll();
            setCurriculums(response.data.data || []);
        } catch (err) {
            console.error('Failed to fetch curriculums', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const titleLength = formData.title ? formData.title.trim().length : 0;
        if (titleLength < 5 || titleLength > 100) {
            setError('Title must be between 5 and 100 characters');
            return;
        }
        if (/(.)\1{4,}/.test(formData.title)) {
            setError('Title contains too many repeating characters (e.g. "aaaaa")');
            return;
        }
        if (!/(?:[a-zA-Z].*){3,}/.test(formData.title)) {
            setError('Title must contain at least 3 alphabetical letters');
            return;
        }
        if (formData.description) {
            if (/(.)\1{4,}/.test(formData.description)) {
                setError('Description contains too many repeating characters');
                return;
            }
            if (!/(?:[a-zA-Z].*){3,}/.test(formData.description)) {
                setError('Description must contain at least 3 alphabetical letters');
                return;
            }
        }
        if (!formData.courseId) {
            setError('Please select a course/curriculum');
            return;
        }
        if (Number(formData.totalMarks) <= 0) {
            setError('Total Marks must be greater than 0');
            return;
        }
        if (Number(formData.passingMarks) < 0 || Number(formData.passingMarks) > Number(formData.totalMarks)) {
            setError('Passing Marks cannot be negative or greater than Total Marks');
            return;
        }
        if (Number(formData.duration) <= 0) {
            setError('Duration must be greater than 0 minutes');
            return;
        }
        if (!formData.file && !isEdit) {
            setError('Please upload an assessment file');
            return;
        }

        setLoading(true);
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'file' && formData[key] !== undefined && formData[key] !== null) {
                submitData.append(key, formData[key]);
            }
        });
        
        if (formData.file) {
            submitData.append('file', formData.file);
        }

        try {
            if (isEdit) {
                await assessmentAPI.updateAssessment(initialData._id, submitData);
            } else {
                await assessmentAPI.createAssessment(submitData);
            }
            navigate('/institute/assessments');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save assessment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="assessment-form" onSubmit={handleSubmit}>
            {error && <div className="form-error-message">{error}</div>}

            <Card>
                <div className="section-title">Assessment Details</div>

                <FormGroup label="Assessment Title" required>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Mid Semester Exam - Data Structures"
                    />
                </FormGroup>

                <FormGroup label="Description">
                    <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                    />
                </FormGroup>

                <div className="form-row">
                    <FormGroup label="Course" required>
                        <Select
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Course' },
                                ...curriculums.map(c => ({ value: c._id, label: `${c.title} (${c.academicYear})` }))
                            ]}
                        />
                    </FormGroup>

                    <FormGroup label="Type" required>
                        <Select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            options={[
                                { value: 'Quiz', label: 'Quiz' },
                                { value: 'Assignment', label: 'Assignment' },
                                { value: 'Midterm', label: 'Midterm' },
                                { value: 'End Semester', label: 'End Semester' },
                                { value: 'Viva', label: 'Viva' },
                                { value: 'Project', label: 'Project' }
                            ]}
                        />
                    </FormGroup>
                </div>

                <div className="form-row">
                    <FormGroup label="Passing Marks">
                        <Input
                            type="number"
                            min="0"
                            name="passingMarks"
                            value={formData.passingMarks}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup label="Total Marks" required>
                        <Input
                            type="number"
                            min="0"
                            name="totalMarks"
                            value={formData.totalMarks}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup label="Duration (Minutes)">
                        <Input
                            type="number"
                            min="0"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>

                <div className="form-row mt-3">
                    <FormGroup label="Upload Assessment File (Excel/PDF)" required={!isEdit}>
                        <Input 
                            type="file" 
                            name="file" 
                            accept=".xlsx, .xls, .pdf"
                            onChange={handleFileChange}
                        />
                        {isEdit && initialData?.originalFileName && (
                            <small className="help-text">Current file: {initialData.originalFileName}</small>
                        )}
                    </FormGroup>
                </div>
            </Card>

            <div className="form-actions mt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/institute/assessments')}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                >
                    {isEdit ? 'Update Assessment' : 'Create Assessment'}
                </Button>
            </div>
        </form>
    );
};

export default AssessmentForm;
