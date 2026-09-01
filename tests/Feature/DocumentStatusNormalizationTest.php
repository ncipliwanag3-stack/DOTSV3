<?php

namespace Tests\Feature;

use App\Models\Document;
use Tests\TestCase;

class DocumentStatusNormalizationTest extends TestCase
{
    public function test_document_status_is_normalized_case_insensitively_for_overdue(): void
    {
        $this->assertSame('overdue', Document::normalizeStatusKey('Overdue'));
        $this->assertSame('overdue', Document::normalizeStatusKey(' overdue '));
        $this->assertTrue(Document::statusMatches('overdue', 'Overdue'));
        $this->assertTrue(Document::statusMatches('Overdue', 'overdue'));
    }
}
