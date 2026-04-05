import Table from '../Table/Table';
import { formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AssessmentTable = ({ assessments, onRowClick, role }) => {
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        if (onRowClick) {
            onRowClick(row);
        } else {
            navigate(`/${role}/assessments/${row._id}`);
        }
    };

    const columns = [
        { key: 'title', label: 'Title' },
        {
            key: 'courseId',
            label: 'Course',
            render: (val) => val?.title || 'Unknown'
        },
        { key: 'type', label: 'Type' },
        { key: 'totalMarks', label: 'Total Marks' },
        {
            key: 'status',
            label: 'Status',
            render: (val) => (
                <span className={`status-badge status-${val === 'published' ? 'approved' : val}`}>
                    {val ? val.charAt(0).toUpperCase() + val.slice(1) : 'Draft'}
                </span>
            )
        },
        {
            key: 'createdAt',
            label: 'Created',
            render: (val) => formatDate(val)
        }
    ];

    return (
        <Table
            columns={columns}
            data={assessments}
            onRowClick={handleRowClick}
            emptyMessage="No assessments found"
        />
    );
};

export default AssessmentTable;
