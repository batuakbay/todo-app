import './Filter.css';

const TodoFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="filter-container">
            <select
                className="filter-select"
                value={currentFilter}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="all">Tümü</option>
                <option value="completed">Tamamlananlar</option>
                <option value="active">Tamamlanmayanlar</option>
            </select>
        </div>
    );
};

export default TodoFilter;