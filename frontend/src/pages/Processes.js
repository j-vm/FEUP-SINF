import React from 'react'
import { Table, Spinner} from "reactstrap"

export const Processes = () => {
	return (
		<div>
			<Table dark>
				<thead>
					<tr>
						<th>#</th>
						<th>Festa</th>
						<th>do</th>
						<th>copy + paste</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ctrl</td>
						<td>C</td>
						<td>Crtl</td>
						<td><Spinner size="sm" color="primary" />{' '}</td>
					</tr>
					<tr>
						<td>Ctrl</td>
						<td>C</td>
						<td>Crtl</td>
						<td><Spinner size="sm" color="primary" />{' '}</td>
					</tr>
					<tr>
						<td>Ctrl</td>
						<td>C</td>
						<td>Crtl</td>
						<td><Spinner size="sm" color="primary" />{' '}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}
