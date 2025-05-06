"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import FormatterPreview from '@/components/FormatterPreview';

const FormatterHelperPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('snippets');
  const [customFormatter, setCustomFormatter] = useState('custom:{"name":"","description":""}');

  // Common formatter snippets with explanations
  const formatterSnippets = [
    {
      id: 'season',
      name: 'Season Number (S01 format)',
      code: '{stream.season::>=0["S"||""]}' + 
            '{stream.season::<=9["0"||""]}' + 
            '{stream.season::>0["{stream.season}"||""]}',
      description: 'Formats season numbers as S01, S02, etc.',
      explanation: 'This snippet checks if season exists, adds "S", adds a leading zero for seasons 1-9, and then adds the actual season number.'
    },
    {
      id: 'episode',
      name: 'Episode Number (E01 format)',
      code: '{stream.episode::>=0["E"||""]}' + 
            '{stream.episode::<=9["0"||""]}' + 
            '{stream.episode::>0["{stream.episode}"||""]}',
      description: 'Formats episode numbers as E01, E02, etc.',
      explanation: 'This snippet checks if episode exists, adds "E", adds a leading zero for episodes 1-9, and then adds the actual episode number.'
    },
    {
      id: 'quality',
      name: 'Quality Tag',
      code: '{stream.quality::/^$|Unknown/[""||" {stream.quality}"]}',
      description: 'Adds quality tag if available (e.g., WEBDL, BluRay)',
      explanation: 'This checks if quality is empty or "Unknown" and only shows it if it has a valid value.'
    },
    {
      id: 'resolution',
      name: 'Resolution Tag',
      code: '{stream.resolution::/^$|Unknown/[""||" {stream.resolution}"]}',
      description: 'Adds resolution if available (e.g., 1080p, 4K)',
      explanation: 'This checks if resolution is empty or "Unknown" and only shows it if it has a valid value.'
    },
    {
      id: 'size',
      name: 'File Size',
      code: '{stream.size::size}',
      description: 'Shows formatted file size (e.g., 2.5 GB)',
      explanation: 'The "size" modifier automatically formats the byte count to a human-readable size.'
    },
    {
      id: 'visualTags',
      name: 'Visual Tags (HDR, DV)',
      code: '{stream.visualTags::/^$|null/[""||" {stream.visualTags}"]}',
      description: 'Shows visual tags like HDR, Dolby Vision, etc.',
      explanation: 'This checks if visualTags exists and displays them with a leading space.'
    },
    {
      id: 'audioTags',
      name: 'Audio Tags (Atmos, DTS)',
      code: '{stream.audioTags::/^$|null/[""||" {stream.audioTags}"]}',
      description: 'Shows audio tags like Atmos, DTS, etc.',
      explanation: 'This checks if audioTags exists and displays them with a leading space.'
    },
    {
      id: 'languages',
      name: 'Language Emojis',
      code: '{stream.languageEmojis::/^$|null/[""||" {stream.languageEmojis}"]}',
      description: 'Shows language emojis for available audio tracks',
      explanation: 'This displays language emoji flags for all available audio tracks.'
    },
    {
      id: 'releaseGroup',
      name: 'Release Group',
      code: '{stream.releaseGroup::/^$|Unknown/[""||" - {stream.releaseGroup}"]}',
      description: 'Shows the release group name',
      explanation: 'This checks if releaseGroup exists and is not "Unknown", then displays it with a dash prefix.'
    },
    {
      id: 'cached',
      name: 'Cached Status',
      code: '{provider.cached::=true["u2713 "||""]}',
      description: 'Shows a checkmark if the stream is cached',
      explanation: 'This displays a checkmark symbol if provider.cached is true.'
    }
  ];

  // Complete template examples
  const formatterTemplates = [
    {
      id: 'tv-show',
      name: 'TV Show Template',
      nameSyntax: '{stream.title} {stream.season::>=0["S"||""]}' + 
                 '{stream.season::<=9["0"||""]}' + 
                 '{stream.season::>0["{stream.season}"||""]}' + 
                 '{stream.episode::>=0["E"||""]}' + 
                 '{stream.episode::<=9["0"||""]}' + 
                 '{stream.episode::>0["{stream.episode}"||""]}' + 
                 '{stream.quality::/^$|Unknown/[""||" {stream.quality}"]}' + 
                 '{stream.resolution::/^$|Unknown/[""||" {stream.resolution}"]}',
      descSyntax: '{provider.cached::=true["u2713 Cached"||""]} ' + 
                 '{stream.size::size} | ' + 
                 '{stream.visualTags::/^$|null/[""||"{stream.visualTags} "]}' + 
                 '{stream.audioTags::/^$|null/[""||"{stream.audioTags} "]}' + 
                 '{stream.languageEmojis::/^$|null/[""||"{stream.languageEmojis} "]}' + 
                 '{stream.releaseGroup::/^$|Unknown/[""||"- {stream.releaseGroup}"]}',
      description: 'Complete template for TV shows with all important information'
    },
    {
      id: 'movie',
      name: 'Movie Template',
      nameSyntax: '{stream.title} {stream.year::/^$|null/[""||"({stream.year})"]} ' + 
                 '{stream.quality::/^$|Unknown/[""||"{stream.quality} "]}' + 
                 '{stream.resolution::/^$|Unknown/[""||"{stream.resolution}"]}',
      descSyntax: '{provider.cached::=true["u2713 Cached"||""]} ' + 
                 '{stream.size::size} | ' + 
                 '{stream.visualTags::/^$|null/[""||"{stream.visualTags} "]}' + 
                 '{stream.audioTags::/^$|null/[""||"{stream.audioTags} "]}' + 
                 '{stream.languageEmojis::/^$|null/[""||"{stream.languageEmojis} "]}' + 
                 '{stream.releaseGroup::/^$|Unknown/[""||"- {stream.releaseGroup}"]}',
      description: 'Complete template for movies with all important information'
    },
    {
      id: 'minimalist',
      name: 'Minimalist Template',
      nameSyntax: '{stream.title} ' + 
                 '{stream.season::>=0["S"||""]}' + 
                 '{stream.season::<=9["0"||""]}' + 
                 '{stream.season::>0["{stream.season}"||""]}' + 
                 '{stream.episode::>=0["E"||""]}' + 
                 '{stream.episode::<=9["0"||""]}' + 
                 '{stream.episode::>0["{stream.episode}"||""]}',
      descSyntax: '{stream.resolution::/^$|Unknown/[""||"{stream.resolution} "]}' + 
                 '{provider.cached::=true["u2713"||""]} ' + 
                 '{stream.size::size}',
      description: 'Minimalist template with only essential information'
    }
  ];

  // Syntax explanation
  const syntaxExplanations = [
    {
      id: 'basic',
      name: 'Basic Syntax',
      explanation: 'The basic format is {type.property}, which displays the value of that property. For example, {stream.title} shows the title of the stream.'
    },
    {
      id: 'modifiers',
      name: 'Modifiers',
      explanation: 'Modifiers change how values are displayed. Use double colon :: followed by the modifier. For example, {stream.size::size} formats the size in bytes to a human-readable format.'
    },
    {
      id: 'conditions',
      name: 'Conditions',
      explanation: 'Conditions check if values meet certain criteria. Format: {property::condition["true value"||"false value"]}. For example, {provider.cached::=true["u2713"||""]} shows a checkmark only if the stream is cached.'
    },
    {
      id: 'comparisons',
      name: 'Comparison Operators',
      explanation: 'Available operators: = (equals), > (greater than), >= (greater than or equal), < (less than), <= (less than or equal). Example: {stream.season::>0["S{stream.season}"||""]} only shows the season if it\'s greater than 0.'
    },
    {
      id: 'regex',
      name: 'Regular Expressions',
      explanation: 'Use /pattern/ for regex matching. Example: {stream.resolution::/^$|Unknown/[""||" {stream.resolution}"]} only shows resolution if it\'s not empty or "Unknown".'
    }
  ];

  // Available properties
  const availableProperties = [
    {
      category: 'stream',
      properties: [
        { name: 'filename', description: 'Full filename of the stream' },
        { name: 'title', description: 'Title of the movie or TV show' },
        { name: 'year', description: 'Release year' },
        { name: 'season', description: 'Season number for TV shows' },
        { name: 'episode', description: 'Episode number for TV shows' },
        { name: 'quality', description: 'Quality tag (WEBDL, BluRay, etc.)' },
        { name: 'resolution', description: 'Resolution (1080p, 4K, etc.)' },
        { name: 'size', description: 'File size in bytes' },
        { name: 'visualTags', description: 'Visual tags (HDR, DV, etc.)' },
        { name: 'audioTags', description: 'Audio tags (Atmos, DTS, etc.)' },
        { name: 'languages', description: 'Language codes' },
        { name: 'languageEmojis', description: 'Language emoji flags' },
        { name: 'releaseGroup', description: 'Release group name' },
        { name: 'encode', description: 'Video encoding format' },
        { name: 'seeders', description: 'Number of seeders for torrents' },
        { name: 'personal', description: 'Whether the stream is from personal storage' },
        { name: 'proxied', description: 'Whether the stream is proxied' }
      ]
    },
    {
      category: 'provider',
      properties: [
        { name: 'id', description: 'Provider ID (realdebrid, premiumize, etc.)' },
        { name: 'name', description: 'Full provider name' },
        { name: 'shortName', description: 'Short provider name' },
        { name: 'cached', description: 'Whether the stream is cached on the provider' }
      ]
    },
    {
      category: 'addon',
      properties: [
        { name: 'id', description: 'Addon ID' },
        { name: 'name', description: 'Addon name' }
      ]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const applyTemplate = (nameSyntax: string, descSyntax: string) => {
    setCustomFormatter(`custom:{"name":"${nameSyntax}","description":"${descSyntax}"}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AIOStreams Formatter Helper</h1>
        <p className="text-lg mb-4">
          This page helps you create custom formatters for AIOStreams without needing to understand the complex syntax.
          Simply copy the snippets you need or use a complete template.
        </p>
        <Link href="/configure" className="text-blue-500 hover:underline">
          u2190 Back to Configure
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation */}
        <div className="md:w-1/4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === 'snippets' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory('snippets')}
                >
                  Formatter Snippets
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === 'templates' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory('templates')}
                >
                  Complete Templates
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === 'syntax' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory('syntax')}
                >
                  Syntax Guide
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === 'properties' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory('properties')}
                >
                  Available Properties
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === 'preview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory('preview')}
                >
                  Live Preview
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4">
          {selectedCategory === 'snippets' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Formatter Snippets</h2>
              <p className="mb-6">
                Copy these snippets to use in your custom formatter. Each snippet is designed to handle a specific aspect of stream formatting.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {formatterSnippets.map((snippet) => (
                  <div key={snippet.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">{snippet.name}</h3>
                    <p className="mb-2">{snippet.description}</p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3 font-mono text-sm overflow-x-auto">
                      {snippet.code}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong>How it works:</strong> {snippet.explanation}
                    </p>
                    <button
                      onClick={() => copyToClipboard(snippet.code)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'templates' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Complete Templates</h2>
              <p className="mb-6">
                These are ready-to-use templates for common scenarios. Click "Apply Template" to see how it looks in the preview.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {formatterTemplates.map((template) => (
                  <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="mb-2">{template.description}</p>
                    <div className="mb-3">
                      <h4 className="font-semibold mb-1">Name Format:</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm overflow-x-auto mb-3">
                        {template.nameSyntax}
                      </div>
                      <h4 className="font-semibold mb-1">Description Format:</h4>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm overflow-x-auto">
                        {template.descSyntax}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => applyTemplate(template.nameSyntax, template.descSyntax)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Apply Template
                      </button>
                      <button
                        onClick={() => {
                          copyToClipboard(`custom:{"name":"${template.nameSyntax}","description":"${template.descSyntax}"}`);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Copy to Clipboard
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'syntax' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Formatter Syntax Guide</h2>
              <p className="mb-6">
                Learn how the custom formatter syntax works with these explanations and examples.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {syntaxExplanations.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p>{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'properties' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
              <p className="mb-6">
                These are all the properties you can use in your custom formatter.
              </p>
              {availableProperties.map((category) => (
                <div key={category.category} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{category.category}</h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left">Property</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Usage Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {category.properties.map((prop) => (
                          <tr key={prop.name}>
                            <td className="px-4 py-3 font-mono">{prop.name}</td>
                            <td className="px-4 py-3">{prop.description}</td>
                            <td className="px-4 py-3 font-mono">{`{${category.category}.${prop.name}}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedCategory === 'preview' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
              <p className="mb-6">
                See how your custom formatter looks with sample data. Apply a template from the "Complete Templates" section or paste your own custom formatter here.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <FormatterPreview formatter={customFormatter} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormatterHelperPage;
