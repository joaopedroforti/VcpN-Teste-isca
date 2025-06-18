<?php

namespace App\Http\Controllers;

use App\Models\BehavioralProfileTest;
use App\Models\PDFTemplate;
use Illuminate\Support\Str;
use Inertia\Inertia;

final class ShowBehavioralProfileReportController extends Controller
{
    public function __invoke(string $uuid)
    {
        $test = BehavioralProfileTest::firstWhere('uuid', $uuid);

        $profilePDFKey = collect(explode(',', $test->profile))->map(fn ($profile) => Str::slug($profile))->join('_e_');

        $pdfTemplates = PDFTemplate::whereIn('description', ['firstsection', 'dictionary', $profilePDFKey])->get();

        return is_null($test)
            ? Inertia::render('NotFound')
            : Inertia::render('ShowBehavioralProfileTest', [
                'test' => $test,
                'person' => auth('person')->user(),
                'firstSection' => $pdfTemplates->firstWhere('description', 'firstsection')->value,
                'dictionary' => $pdfTemplates->firstWhere('description', 'dictionary')->value,
                'report' => $pdfTemplates->firstWhere('description', $profilePDFKey)->value,
            ]);
    }
}
