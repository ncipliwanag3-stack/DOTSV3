<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class EmployeeController extends Controller
{
    public function index()
    {
        $service = config('services.employees');
        $request = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->timeout(10);

        if (!empty($service['token'])) {
            $request = $request->withToken($service['token']);
        }

        if (!empty($service['username'])) {
            $request = $request->withHeaders([
                'X-API-Username' => $service['username'],
                'X-API-Password' => md5($service['password'] ?? ''),
            ]);
        }

        try {
            $payload = $request->get($service['url'])->throw()->json();
        } catch (RequestException|ConnectionException $exception) {
            report($exception);

            return response()->json([
                'message' => 'The employee service is unavailable.',
                'employees' => [],
            ], $exception->response?->status() ?? 502);
        }

        $employees = $payload['data'] ?? $payload['employees'] ?? $payload;
        $employees = is_array($employees) ? $employees : [];

        return response()->json([
            'employees' => collect($employees)->map(function (array $employee) {
                $fullname = trim($employee['fullname'] ?? $employee['full_name'] ?? implode(' ', array_filter([
                    $employee['first_name'] ?? $employee['firstName'] ?? null,
                    $employee['last_name'] ?? $employee['lastName'] ?? null,
                ])));

                return [
                    'id' => $employee['id'] ?? $employee['employee_id'] ?? null,
                    'first_name' => $employee['first_name'] ?? $employee['firstName'] ?? null,
                    'last_name' => $employee['last_name'] ?? $employee['lastName'] ?? null,
                    'fullname' => $fullname,
                    'email' => $employee['email'] ?? $employee['email_address'] ?? null,
                    'division_code' => $employee['division_code'] ?? $employee['divisionCode'] ?? null,
                    'division' => $employee['division'] ?? $employee['department'] ?? null,
                ];
            })->values(),
        ]);
    }
}